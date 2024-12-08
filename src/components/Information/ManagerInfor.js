import React, { useEffect, useState } from "react";
import "./EmployeeInfor.scss";
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaBriefcase } from "react-icons/fa";

const ManagerInfor = () => {
  // State for profile data
  const [profile, setProfile] = useState({
    name: "",
    position: "",
    phone: "",
    email: "",
    address: "",
    department: "",
    profileImage: "",
  });

  const [isEditing, setIsEditing] = useState(false); // Track edit mode
  const [loading, setLoading] = useState(true); // Track loading state
  const [error, setError] = useState(""); // Track error state
  const [isUploading, setIsUploading] = useState(false); // Track upload state

  useEffect(() => {
    // Fetch data from API
    const fetchEmployeeData = async () => {
      try {
        const token = localStorage.getItem("token");
        const accountId = localStorage.getItem("accountId");

        if (!token || !accountId) {
          setError("Authentication token or account ID not found");
          setLoading(false);
          return;
        }

        const response = await fetch(
          `http://localhost:8080/api/managers/account?id=${accountId}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch employee data");
        }

        const data = await response.json();

        // Save personelCode to localStorage
        localStorage.setItem("personelCode", data.personelCode);
        console.log("personelCode >>>> ", data.personelCode);
        localStorage.setItem("name", `${data.lastName} ${data.firstName}`);
        console.log("myname >>>", `${data.lastName} ${data.firstName}`);
        setProfile({
          name: `${data.lastName} ${data.firstName}`,
          phone: data.phone,
          email: data.email,
          address: `${data.street}, ${data.city}`,
          department: data.departmentName,
          position: data.position,
          profileImage: data.avatar,
        });
        setLoading(false);
      } catch (err) {
        console.error("Error fetching employee data:  mananan", err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchEmployeeData();
  }, []);

  // Toggle edit mode
  const toggleEditMode = () => {
    setIsEditing(!isEditing);
  };

  // Save changes
  const handleSave = () => {
    setIsEditing(false);
    console.log("Updated profile:", profile);
  };

  // Handle file input for avatar upload
  const handleAvatarUpload = async (event) => {
    const file = event.target.files[0];
    if (!file || file.type !== "image/png") {
      alert("Please upload a PNG image");
      return;
    }

    setIsUploading(true);
    const token = localStorage.getItem("token");

    // Create FormData object for the image upload
    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await fetch("http://localhost:8080/api/images/upload", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      console.log("pass uup")

      if (!response.ok) {
        throw new Error("Failed to upload image");
      }

      const data = await response.json();
      setProfile((prevProfile) => ({
        ...prevProfile,
        profileImage: data.imageUrl, // Assuming the response contains the URL to the uploaded image
      }));
    } catch (err) {
      console.error("Error uploading avatar:", err);
    } finally {
      setIsUploading(false);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="employee-profile">
      {/* Profile Header */}
      <div className="profile-header">
        <img
          src={profile.profileImage || "default_profile_picture.png"}
          alt="Employee Profile"
          className="profile-image"
        />
        <div className="header-text">
          {isEditing ? (
            <input
              type="text"
              name="name"
              value={profile.name}
              onChange={(e) =>
                setProfile({ ...profile, name: e.target.value })
              }
              className="editable-input"
            />
          ) : (
            <h2 className="employee-name">{profile.name}</h2>
          )}
          {isEditing ? (
            <input
              type="text"
              name="position"
              value={profile.position}
              onChange={(e) =>
                setProfile({ ...profile, position: e.target.value })
              }
              className="editable-input"
            />
          ) : (
            <p className="employee-position">{profile.position}</p>
          )}
        </div>
      </div>

      {/* Avatar upload */}
      <div className="avatar-upload">
        {isUploading ? (
          <p>Uploading...</p>
        ) : (
          <label className="upload-button">
            <input
              type="file"
              accept="image/png"
              onChange={handleAvatarUpload}
              className="file-input"
            />
            Chọn ảnh đại diện
          </label>
        )}
      </div>

      {/* Profile Details */}
      <div className="profile-details">
        <div className="info-group">
          <h3>Thông tin liên lạc</h3>
          <p>
            <FaPhone /> {profile.phone}
          </p>
          <p>
            <FaEnvelope /> {profile.email}
          </p>
          <p>
            <FaMapMarkerAlt /> {profile.address}
          </p>
        </div>
        <div className="info-group">
          <h3>Thông tin công việc</h3>
          <p>
            <FaBriefcase /> Phòng ban: {profile.department}
          </p>
        </div>
      </div>

      {/* Edit and Save Buttons */}
      <div className="button-group">
        {isEditing ? (
          <button className="save-button" onClick={handleSave}>
            Lưu
          </button>
        ) : (
          <button className="edit-button" onClick={toggleEditMode}>
            Chỉnh sửa
          </button>
        )}
      </div>
    </div>
  );
};

export default ManagerInfor;