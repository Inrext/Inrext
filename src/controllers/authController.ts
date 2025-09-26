import User from "../models/User";
import { signToken, verifyToken } from "../lib/jwt";
import bcrypt from "bcryptjs";

// Minimal any types for Express-like handlers to avoid adding express types
type Req = any;
type Res = any;
type Next = any;

export const register = async (req: Req, res: Res) => {
  const { email, password, username, role, phoneNumber, teamHead, hierarchyLevel, hierarchyPath } = req.body;
  let photoURL = '';

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  if (req.file) {
    photoURL = `/uploads/profile-photos/${req.file.filename}`;
  }

  if (phoneNumber && !/^\+?[0-9]{10,15}$/.test(phoneNumber)) {
    return res.status(400).json({ error: "Invalid phone number format" });
  }

  try {
    if (role && role !== 'investor') {
      const requestingUser = await User.findById(req.user?.uid);
      if (!requestingUser || requestingUser.role !== 'super_admin') {
        return res.status(403).json({ error: "Only super admin can create users with elevated roles" });
      }
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      email,
      username,
      phoneNumber,
      photoURL,
      role: role || 'investor',
      password: hashedPassword,
      teamHead: teamHead || null,
      hierarchyLevel: hierarchyLevel || 1,
      hierarchyPath: hierarchyPath || (teamHead ? teamHead : null),
      assignedProjects: [],
      associates: [],
      isActive: true,
    });

    await newUser.save();

    const token = signToken({ uid: newUser._id, email: newUser.email, role: newUser.role });

    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: {
        uid: newUser._id,
        email: newUser.email,
        username: newUser.username,
        phoneNumber: newUser.phoneNumber,
        photoURL: newUser.photoURL,
        role: newUser.role,
        permissions: newUser.permissions,
        assignedProjects: newUser.assignedProjects,
        isActive: newUser.isActive,
        teamHead: newUser.teamHead,
        associates: newUser.associates,
        hierarchyLevel: newUser.hierarchyLevel,
        hierarchyPath: newUser.hierarchyPath,
        createdAt: newUser.createdAt,
        updatedAt: newUser.updatedAt,
      }
    });
  } catch (error: any) {
    console.error('Registration error:', error);
    if (req.file) {
      const fs = require('fs');
      fs.unlink(req.file.path, (err: any) => {
        if (err) console.error('Error deleting uploaded file:', err);
      });
    }

    res.status(400).json({ error: error.message });
  }
};

export const login = async (req: Req, res: Res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }
  try {
    const user = await User.findOne({ email });
    if (!user || !user.password) {
      return res.status(404).json({ error: "User not found in database" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid credentials" });
    }
    const token = signToken({ uid: user._id, email: user.email, role: user.role });

    res.status(200).json({
      message: 'User logged in successfully',
      token,
      user: {
        uid: user._id,
        email: user.email,
        username: user.username,
        phoneNumber: user.phoneNumber,
        photoURL: user.photoURL,
        role: user.role,
        permissions: user.permissions
      }
    });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const socialLogin = async (req: Req, res: Res) => {
  try {
    const { email, displayName, photoURL, providerId, username, phoneNumber } = req.body;

    let user = await User.findOne({ email });
    if (!user) {
      user = new User({
        email,
        username: username || email.split('@')[0],
        phoneNumber,
        displayName,
        photoURL,
        providerId,
        role: 'investor'
      });
      await user.save();
    }

    const token = signToken({ uid: user._id, email: user.email, role: user.role });

    res.status(200).json({
      message: 'User logged in successfully',
      token,
      user: {
        uid: user._id,
        email: user.email,
        username: user.username,
        phoneNumber: user.phoneNumber,
        role: user.role,
        permissions: user.permissions
      }
    });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const getUserByUid = async (req: Req, res: Res) => {
  const { uid } = req.params;
  try {
    const user = await User.findById(uid).select('-__v -password');
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json({ user });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const updateUserRole = async (req: Req, res: Res) => {
  const { userId } = req.params;
  const { role } = req.body;

  try {
    const requestingUser = await User.findById(req.user.uid);
    if (!requestingUser || requestingUser.role !== 'super_admin') {
      return res.status(403).json({ error: "Only super admin can update roles" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    user.role = role;
    user.permissions = (User as any).getDefaultPermissions(role);
    await user.save();

    res.status(200).json({
      message: 'User role updated successfully',
      user: {
        uid: user._id,
        email: user.email,
        role: user.role,
        permissions: user.permissions
      }
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const protect = async (req: Req, res: Res, next: Next) => {
  try {
    const authHeader = req.headers.authorization || req.headers.Authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'No token provided' });
    }
    const token = authHeader.split(' ')[1];
  const decoded: any = verifyToken(token);
  const user = await User.findById(decoded.uid);
    if (!user) {
      return res.status(404).json({ error: "User not found in database" });
    }
    req.user = {
      ...decoded,
      id: user._id,
      role: user.role
    };
    next();
  } catch (error: any) {
    res.status(401).json({ error: 'Unauthorized: Invalid or expired token' });
  }
};

export const restrictTo = (...roles: string[]) => {
  return (req: Req, res: Res, next: Next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ error: 'Forbidden: Access denied' });
    }
    next();
  };
};

export default {
  register,
  login,
  socialLogin,
  getUserByUid,
  updateUserRole,
  loginWithGoogle: socialLogin,
  loginWithFacebook: socialLogin,
  protect,
  restrictTo,
};
