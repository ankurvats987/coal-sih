import React, { useState } from "react";
import { Save, Edit2, X } from "lucide-react";

interface UserProfileProps {
  onClose?: () => void;
}

export default function UserProfile({ onClose }: UserProfileProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "Dr. John Doe",
    email: "john.doe@iitdelhi.ac.in",
    institution: "IIT Delhi",
    designation: "Professor",
    phone: "+91 98765 43210",
    department: "Mining Engineering",
    address: "Hauz Khas, New Delhi - 110016",
    researchArea: "Coal Mining Technology, Safety Systems",
    experience: "15 years",
    orcidId: "0000-0002-1234-5678",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = () => {
    // In a real app, save to backend
    setIsEditing(false);
    alert("Profile updated successfully!");
  };

  const handleCancel = () => {
    setIsEditing(false);
    // Reset form data if needed
  };

  return (
    <div className="bg-white rounded border border-gray-200">
      <div className="px-5 py-4 border-b border-gray-200 flex justify-between items-center bg-gray-50">
        <h3 className="text-base font-semibold text-gray-900">
          Profile Information
        </h3>
        <div className="flex items-center gap-2">
          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded transition-colors"
            >
              <Edit2 className="h-3.5 w-3.5" />
              <span>Edit</span>
            </button>
          ) : (
            <>
              <button
                onClick={handleCancel}
                className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded transition-colors"
              >
                <X className="h-3.5 w-3.5" />
                <span>Cancel</span>
              </button>
              <button
                onClick={handleSave}
                className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded transition-colors"
              >
                <Save className="h-3.5 w-3.5" />
                <span>Save</span>
              </button>
            </>
          )}
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Personal Information */}
        <div>
          <h4 className="text-sm font-semibold text-gray-900 mb-3 pb-2 border-b">
            Personal Information
          </h4>
          <div className="grid grid-cols-3 gap-x-6 gap-y-4">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1.5 block">
                Full Name
              </label>
              {isEditing ? (
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              ) : (
                <p className="text-sm text-gray-900">{formData.fullName}</p>
              )}
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1.5 block">
                Email Address
              </label>
              {isEditing ? (
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              ) : (
                <p className="text-sm text-gray-900">{formData.email}</p>
              )}
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1.5 block">
                Contact Number
              </label>
              {isEditing ? (
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              ) : (
                <p className="text-sm text-gray-900">{formData.phone}</p>
              )}
            </div>
          </div>
        </div>

        {/* Professional Information */}
        <div>
          <h4 className="text-sm font-semibold text-gray-900 mb-3 pb-2 border-b">
            Professional Information
          </h4>
          <div className="grid grid-cols-3 gap-x-6 gap-y-4">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1.5 block">
                Institution
              </label>
              {isEditing ? (
                <input
                  type="text"
                  name="institution"
                  value={formData.institution}
                  onChange={handleChange}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              ) : (
                <p className="text-sm text-gray-900">{formData.institution}</p>
              )}
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1.5 block">
                Department
              </label>
              {isEditing ? (
                <input
                  type="text"
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              ) : (
                <p className="text-sm text-gray-900">{formData.department}</p>
              )}
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1.5 block">
                Designation
              </label>
              {isEditing ? (
                <input
                  type="text"
                  name="designation"
                  value={formData.designation}
                  onChange={handleChange}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              ) : (
                <p className="text-sm text-gray-900">{formData.designation}</p>
              )}
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1.5 block">
                Experience
              </label>
              {isEditing ? (
                <input
                  type="text"
                  name="experience"
                  value={formData.experience}
                  onChange={handleChange}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              ) : (
                <p className="text-sm text-gray-900">{formData.experience}</p>
              )}
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1.5 block">
                ORCID iD
              </label>
              {isEditing ? (
                <input
                  type="text"
                  name="orcidId"
                  value={formData.orcidId}
                  onChange={handleChange}
                  placeholder="0000-0000-0000-0000"
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              ) : (
                <p className="text-sm text-gray-900">
                  {formData.orcidId || "Not provided"}
                </p>
              )}
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1.5 block">
                Address
              </label>
              {isEditing ? (
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              ) : (
                <p className="text-sm text-gray-900">{formData.address}</p>
              )}
            </div>
          </div>
        </div>

        {/* Research Information */}
        <div>
          <h4 className="text-sm font-semibold text-gray-900 mb-3 pb-2 border-b">
            Research Information
          </h4>
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1.5 block">
              Research Area/Specialization
            </label>
            {isEditing ? (
              <textarea
                name="researchArea"
                value={formData.researchArea}
                onChange={handleChange}
                rows={2}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            ) : (
              <p className="text-sm text-gray-900">{formData.researchArea}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
