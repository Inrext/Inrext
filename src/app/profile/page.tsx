// "use client";
// // Profile.tsx (Next.js + TypeScript)
// import React, { useState, useEffect, ChangeEvent, FormEvent, useContext } from 'react';
// import { useRouter } from 'next/navigation';
// import { useTheme } from '../content/ThemeContext';
// import { AuthContext } from '../content/AuthContext';
// import axios from 'axios';
// import { backendApi, BACKEND_BASE_URL } from '../../lib/api';
// import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import Image from 'next/image';

// type FormData = {
//   username: string;
//   email: string;
//   phoneNumber: string;
//   currentPassword: string;
//   newPassword: string;
// };

// const Profile: React.FC = () => {
//   const { isDarkMode } = useTheme();
//   const router = useRouter();
//   const authContext = useContext(AuthContext);
//   const contextUser = authContext?.user;
//   const logout = authContext?.logout ?? (() => {});
//   const refreshUser = authContext?.refreshUser ?? (() => {});

//   const [editMode, setEditMode] = useState<boolean>(false);
//   const [loading, setLoading] = useState<boolean>(false);
//   const [formData, setFormData] = useState<FormData>({
//     username: '',
//     email: '',
//     phoneNumber: '',
//     currentPassword: '',
//     newPassword: '',
//   });
//   const [photoFile, setPhotoFile] = useState<File | null>(null);
//   const [photoPreview, setPhotoPreview] = useState<string>('');

//   // Check token expiration on mount and periodically
//   useEffect(() => {
//     const checkTokenExpiration = () => {
//       const token = localStorage.getItem('token');
//       if (!token) {
//         logout();
//         return;
//       }
      
//       try {
//         const payload = JSON.parse(atob(token.split('.')[1]));
//         if (payload.exp * 1000 < Date.now()) {
//           toast.error('Your session has expired. Please login again.');
//           logout();
//         }
//       } catch (e) {
//         logout();
//       }
//     };

//     checkTokenExpiration();
//     const interval = setInterval(checkTokenExpiration, 300000); // Check every 5 minutes

//     return () => clearInterval(interval);
//   }, [logout]);

//   // Initialize form data
//   useEffect(() => {
//     if (contextUser) {
//       setFormData({
//         username: contextUser.username || '',
//         email: contextUser.email || '',
//         phoneNumber: contextUser.phoneNumber || '',
//         currentPassword: '',
//         newPassword: '',
//       });

//       setPhotoPreview(
//         contextUser.photoURL
//           ? contextUser.photoURL.startsWith('http')
//             ? contextUser.photoURL
//             : `${BACKEND_BASE_URL}${contextUser.photoURL}`
//           : `https://ui-avatars.com/api/?name=${contextUser.username}&background=random`
//       );
//     }
//   }, [contextUser]);

//   const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       if (file.size > 2 * 1024 * 1024) {
//         toast.error('File size should be less than 2MB');
//         return;
//       }
//       setPhotoFile(file);
//       setPhotoPreview(URL.createObjectURL(file));
//     }
//   };

//   const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     setLoading(true);

//     if (!formData.currentPassword) {
//       toast.error('Current password is required to make changes');
//       setLoading(false);
//       return;
//     }

//     try {
//       const updateData = new FormData();
//       updateData.append('username', formData.username);
//       updateData.append('email', formData.email);
//       updateData.append('phoneNumber', formData.phoneNumber);
//       if (photoFile) updateData.append('photo', photoFile);
//       if (formData.newPassword) updateData.append('password', formData.newPassword);
//       updateData.append('currentPassword', formData.currentPassword);

//       const response = await backendApi.put(
//         `/auth/user/${contextUser.uid}`,
//         updateData,
//         {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem('token')}`,
//             'Content-Type': 'multipart/form-data',
//           },
//         }
//       );

//       localStorage.setItem('user', JSON.stringify(response.data.user));
//       refreshUser();
//       toast.success('Profile updated successfully!');
//       setEditMode(false);
//     } catch (err: any) {
//       console.error('Update error:', err);
//       toast.error(err.response?.data?.error || 'Failed to update profile');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleLogout = async () => {
//     try {
//       await logout();
//       toast.success('Logged out successfully');
//       router.push('/');
//     } catch (err) {
//       toast.error('Failed to logout');
//     }
//   };

//   if (!contextUser) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
//       </div>
//     );
//   }

//   return (
//     <div className={`min-h-screen py-8 px-4 sm:px-6 lg:px-8 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
//       <div className="max-w-4xl mx-auto mt-8" >
//         <div className={`rounded-lg shadow-xl overflow-hidden ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
//           {/* Profile Header */}
//           <div className={`px-6 py-8 sm:px-10 sm:py-6 text-center ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
//             <div className="relative inline-block">
//               {photoPreview ? (
//                 <Image
//                   className="h-24 w-24 sm:h-32 sm:w-32 rounded-full object-cover border-4 border-white shadow-md"
//                   src={photoPreview || `https://ui-avatars.com/api/?name=${contextUser.username}&background=random`}
//                   alt="Profile"
//                   width={128}
//                   height={128}
//                   unoptimized={true}
//                   onError={(e) => {
//                     (e.target as HTMLImageElement).onerror = null;
//                     (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${contextUser.username}&background=random`;
//                   }}
//                   priority
//                 />
//               ) : (
//                 <div className="h-24 w-24 sm:h-32 sm:w-32 rounded-full object-cover border-4 border-white shadow-md flex items-center justify-center bg-gray-200">
//                   <span className="text-gray-500 text-3xl font-bold">
//                     {contextUser.username?.charAt(0).toUpperCase() || "U"}
//                   </span>
//                 </div>
//               )}
//               {editMode && (
//                 <label className="absolute bottom-0 right-0 bg-blue-600 text-white rounded-full p-2 cursor-pointer hover:bg-blue-700 transition-colors shadow-md">
//                   <input
//                     type="file"
//                     className="hidden"
//                     accept="image/*"
//                     onChange={handleFileChange}
//                   />
//                   <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
//                     <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
//                   </svg>
//                 </label>
//               )}
//             </div>
//             <h1 className={`mt-4 text-2xl sm:text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
//               {contextUser.username}
//             </h1>
//             <p className={`mt-1 text-sm sm:text-base ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
//               {contextUser.email}
//             </p>
//             {contextUser.role && (
//               <span className={`inline-block capitalize mt-2 px-3 py-1 rounded-full text-xs font-semibold ${isDarkMode ? 'bg-blue-900 text-blue-100' : 'bg-blue-100 text-blue-800'}`}>
//                 {contextUser.role.replace('_', ' ')}
//               </span>
//             )}
//             {/* Admin badge */}
//             {contextUser.role === 'admin' && (
//               <span className="inline-block mt-2 px-3 py-1 rounded-full text-xs font-semibold bg-yellow-500 text-white ml-2">
//                 Admin Access
//               </span>
//             )}
//           </div>

//           {/* Profile Content */}
//           <div className="px-6 py-8 sm:px-10 sm:py-5">
//             {/* Admin Leads Section */}
//             {contextUser.role === 'admin' && (
//               <div className="mb-8">
//                 <h2 className={`text-xl font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
//                   Leads Management
//                 </h2>
//                 <button
//                   className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
//                   onClick={() => router.push('/admin/leads')}
//                 >
//                   Access Leads
//                 </button>
//               </div>
//             )}
//             {!editMode ? (
//               // View Mode
//               <div className="space-y-6">
//                 <div>
//                   <h2 className={`text-xl font-semibold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
//                     Personal Information
//                   </h2>
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                     <div>
//                       <p className={`text-sm font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Username</p>
//                       <p className={`mt-1 text-base ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
//                         {contextUser.username || 'Not set'}
//                       </p>
//                     </div>
//                     <div>
//                       <p className={`text-sm font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Email</p>
//                       <p className={`mt-1 text-base ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
//                         {contextUser.email}
//                       </p>
//                     </div>
//                     <div>
//                       <p className={`text-sm font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Phone</p>
//                       <p className={`mt-1 text-base ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
//                         {contextUser.phoneNumber || 'Not provided'}
//                       </p>
//                     </div>
//                     {/* <div>
//                       <p className={`text-sm font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Member Since</p>
//                       <p className={`mt-1 text-base ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
//                         {new Date(contextUser.createdAt).toLocaleDateString()}
//                       </p>
//                     </div> */}
//                   </div>
//                 </div>

//                 <div className="flex flex-col sm:flex-row justify-end gap-4 pt-6">
//                   <button
//                     onClick={handleLogout}
//                     className="px-4 py-2 cursor-pointer bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors"
//                   >
//                     Logout
//                   </button>
//                   <button
//                     onClick={() => setEditMode(true)}
//                     className="px-4 cursor-pointer py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
//                   >
//                     Edit Profile
//                   </button>
//                 </div>
//               </div>
//             ) : (
//               // Edit Mode
//               <form onSubmit={handleSubmit} className="space-y-6">
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                   <div>
//                     <label
//                       htmlFor="username"
//                       className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}
//                     >
//                       Username
//                     </label>
//                     <input
//                       type="text"
//                       id="username"
//                       name="username"
//                       value={formData.username}
//                       onChange={handleInputChange}
//                       className={`mt-1 block w-full rounded-md border py-2 px-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 sm:text-sm ${
//                         isDarkMode
//                           ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
//                           : 'border-gray-300 text-gray-900 placeholder-gray-500'
//                       }`}
//                       required
//                     />
//                   </div>

//                   <div>
//                     <label
//                       htmlFor="email"
//                       className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}
//                     >
//                       Email
//                     </label>
//                     <input
//                       type="email"
//                       id="email"
//                       name="email"
//                       value={formData.email}
//                       onChange={handleInputChange}
//                       className={`mt-1 block w-full rounded-md border py-2 px-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 sm:text-sm ${
//                         isDarkMode
//                           ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
//                           : 'border-gray-300 text-gray-900 placeholder-gray-500'
//                       }`}
//                       required
//                     />
//                   </div>

//                   <div>
//                     <label
//                       htmlFor="phoneNumber"
//                       className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}
//                     >
//                       Phone Number
//                     </label>
//                     <input
//                       type="tel"
//                       id="phoneNumber"
//                       name="phoneNumber"
//                       value={formData.phoneNumber}
//                       onChange={handleInputChange}
//                       className={`mt-1 block w-full rounded-md border py-2 px-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 sm:text-sm ${
//                         isDarkMode
//                           ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
//                           : 'border-gray-300 text-gray-900 placeholder-gray-500'
//                       }`}
//                     />
//                   </div>

//                   <div>
//                     <label
//                       htmlFor="currentPassword"
//                       className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}
//                     >
//                       Current Password
//                     </label>
//                     <input
//                       type="password"
//                       id="currentPassword"
//                       name="currentPassword"
//                       value={formData.currentPassword}
//                       onChange={handleInputChange}
//                       className={`mt-1 block w-full rounded-md border py-2 px-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 sm:text-sm ${
//                         isDarkMode
//                           ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
//                           : 'border-gray-300 text-gray-900 placeholder-gray-500'
//                       }`}
//                       required
//                       placeholder="Required for changes"
//                     />
//                   </div>

//                   <div>
//                     <label
//                       htmlFor="newPassword"
//                       className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}
//                     >
//                       New Password
//                     </label>
//                     <input
//                       type="password"
//                       id="newPassword"
//                       name="newPassword"
//                       value={formData.newPassword}
//                       onChange={handleInputChange}
//                       className={`mt-1 block w-full rounded-md border py-2 px-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 sm:text-sm ${
//                         isDarkMode
//                           ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
//                           : 'border-gray-300 text-gray-900 placeholder-gray-500'
//                       }`}
//                       placeholder="Leave blank to keep current"
//                     />
//                   </div>
//                 </div>

//                 <div className="flex flex-col sm:flex-row justify-end gap-4 pt-6">
//                   <button
//                     type="button"
//                     onClick={() => setEditMode(false)}
//                     className={`px-4 py-2 rounded-md border shadow-sm text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors ${
//                       isDarkMode
//                         ? 'bg-gray-700 border-gray-600 text-white hover:bg-gray-600'
//                         : 'border-gray-300 text-gray-700 hover:bg-gray-50'
//                     }`}
//                   >
//                     Cancel
//                   </button>
//                   <button
//                     type="submit"
//                     disabled={loading}
//                     className="px-4 py-2 bg-blue-600 text-white rounded-md shadow-sm text-sm font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 transition-colors"
//                   >
//                     {loading ? (
//                       <>
//                         <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                           <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                           <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                         </svg>
//                         Saving...
//                       </>
//                     ) : (
//                       'Save Changes'
//                     )}
//                   </button>
//                 </div>
//               </form>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Profile;
