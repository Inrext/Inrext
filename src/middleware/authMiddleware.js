// middleware/authMiddleware.js
import User from '../models/User';
import admin from 'firebase-admin';

// Middleware to verify Firebase token and attach user
export const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization || req.headers.Authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'No token provided' });
    }

    const idToken = authHeader.split(' ')[1];

    // Verify Firebase token
    const decodedToken = await admin.auth().verifyIdToken(idToken);

    // Get user from DB
    const user = await User.findOne({ uid: decodedToken.uid });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error('Auth error:', error);
    res.status(401).json({ error: 'Unauthorized: Invalid or expired token' });
  }
};

// Middleware to check user role
export const checkRole = (roles) => {
  return async (req, res, next) => {
    try {
      const user = await User.findOne({ uid: req.user.uid });
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      if (!roles.includes(user.role)) {
        return res.status(403).json({ error: "Access denied - Insufficient privileges" });
      }

      req.user.role = user.role;
      req.user.permissions = user.permissions;
      next();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
};

// Middleware to check specific permission
export const checkPermission = (permission) => {
  return async (req, res, next) => {
    try {
      if (!req.user.permissions || !req.user.permissions[permission]) {
        return res.status(403).json({ error: "Permission denied" });
      }
      next();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
};

export const protect = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization || req.headers.Authorization;
    
    if (!authHeader?.startsWith('Bearer ')) {
      return res.status(401).json({ 
        status: 'fail',
        message: 'No token provided or invalid format' 
      });
    }

    const idToken = authHeader.split(' ')[1];

    // Verify Firebase token
    const decodedToken = await admin.auth().verifyIdToken(idToken);

    // Get user from DB
    const user = await User.findOne({ uid: decodedToken.uid });

    if (!user) {
      return res.status(404).json({ 
        status: 'fail',
        message: "User not found" 
      });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error('Auth error:', error);

    return res.status(401).json({ 
      status: 'fail',
      message: 'Unauthorized: Invalid or expired token' 
    });
  }
};

// Middleware to restrict access based on role
export const restrictTo = (...roles) => {
  return async (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ 
        error: "Access denied - Insufficient privileges" 
      });
    }
    next();
  };
};


