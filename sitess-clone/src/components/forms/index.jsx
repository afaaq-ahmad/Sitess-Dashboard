"use client";
import { useState, useEffect, useRef } from "react";
import {
  Cog,
  ChevronsUpDown,
  Gamepad2,
  Copy,
  Calendar,
  Check,
  Search,
} from "lucide-react";
import Image from "next/image";
import Styles from "./styles.module.css";
import Modal from "../modal/modal";
import axios from "axios";

const SettingForms = () => {
  const [activeForm, setActiveForm] = useState(1);
  const [currentFormText, setCurrentFormText] = useState("Profile");
  const optionsRef = useRef(null);
  const premiumRef = useRef(null);
  const statusRef = useRef(null);
  const badgeRef = useRef(null);
  const [formOptionsVisibility, setFormOptionsVisiblity] = useState(false);
  const [verifiedBadge, setVerifiedBadge] = useState("No");
  const [badgeOptionVisibility, setBadgeOptionVisibility] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalPosition, setModalPosition] = useState("center");
  const [activeModalSwitch, setActiveModalSwitch] = useState(1);
  const [premiumOptionsVisibility, setPremiumOptionsVisibility] =
    useState(false);
  const [statusOptionsVisibility, setStatusOptionsVisibility] = useState(false);
  const [selectedPremiumOption, setSelectedPremiumOption] = useState("Yes");
  const [currentStatus, setCurrentStatus] = useState("In Game (Join Button)");
  const [profileFormData, setProfileFormData] = useState({
    realName: "",
    fakeName: "",
    displayName: "",
    premium: "Yes",
    friends: null,
    followers: null,
    followings: null,
    status: "In Game (Join Button)",
    creationDate: "",
    description: "",
  });
  const [groupFormData, setGroupFormData] = useState({
    realGroupURL: "",
    groupOwnerName: "",
    groupName: "",
    members: null,
    verifiedBadge: "No",
    funds: null,
    groupDescription: "",
    groupShout: "",
  });
  const [triplehookFormData, setTriplehookFormData] = useState({
    directoryName: "",
    displayName: "",
    inviteURL: "",
    imageURL: "",
    webhook: "",
  });

  const openModal = (position) => {
    setModalPosition(position);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const profileForm = () => {
    const handleChange = (e) => {
      const { name, value } = e.target;
      setProfileFormData({
        ...profileFormData,
        [name]: value,
      });
    };

    const handleSaveChanges = () => {
      const updatedProfileFormData = {
        ...profileFormData,
        premium: selectedPremiumOption,
        status: currentStatus,
      };

      const isEmptyField = Object.values(updatedProfileFormData).some(
        (value) => value === "" || value === null
      );

      if (isEmptyField) {
        alert("Please fill in all fields.");
        return;
      }

      axios
        .post("/api/profile", updatedProfileFormData)
        .then((response) => {
          console.log("Profile updated successfully", response.data);
        })
        .catch((error) => {
          console.error("There was an error updating the profile!", error);
        });
    };

    return (
      <div className={Styles.profileFormContainer}>
        <div className={Styles.inputsContainer}>
          <div className={Styles.inputItemContainer}>
            <div>Real Username</div>
            <input
              type="text"
              name="realName"
              placeholder="Roblox"
              value={profileFormData.realName}
              onChange={handleChange}
            />
          </div>
          <div className={Styles.inputItemContainer}>
            <div>Fake Username</div>
            <input
              type="text"
              name="fakeName"
              placeholder="ROBLOX"
              value={profileFormData.fakeName}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className={Styles.inputsContainer}>
          <div className={Styles.inputItemContainer}>
            <div>Display Name</div>
            <input
              type="text"
              name="displayName"
              placeholder="ROBLOX"
              value={profileFormData.displayName}
              onChange={handleChange}
            />
          </div>
          <div className={Styles.inputItemContainer}>
            <div>Premium</div>
            <div
              className={`${Styles.formOptionsContainer} ${Styles.premiumContainerWidth}`}
              onClick={() => {
                setPremiumOptionsVisibility(!premiumOptionsVisibility);
              }}
            >
              <div>{selectedPremiumOption}</div>
              <ChevronsUpDown size={12} color="#a1a1aa" />
              {premiumOptionsVisibility && premiumOptions()}
            </div>
          </div>
        </div>
        <div className={Styles.inputsContainer}>
          <div className={Styles.inputItemContainer}>
            <div>Friends</div>
            <input
              type="number"
              name="friends"
              placeholder="0"
              className={Styles.numberInputWidth}
              value={profileFormData.friends}
              onChange={handleChange}
            />
          </div>
          <div className={Styles.inputItemContainer}>
            <div>Followers</div>
            <input
              type="number"
              name="followers"
              placeholder="0"
              className={Styles.numberInputWidth}
              value={profileFormData.followers}
              onChange={handleChange}
            />
          </div>
          <div className={Styles.inputItemContainer}>
            <div>Followings</div>
            <input
              type="number"
              name="followings"
              placeholder="0"
              className={Styles.numberInputWidth}
              value={profileFormData.followings}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className={Styles.inputsContainer}>
          <div className={Styles.inputItemContainer}>
            <div>Status</div>
            <div
              className={`${Styles.formOptionsContainer} ${Styles.premiumContainerWidth}`}
              onClick={() => {
                setStatusOptionsVisibility(!statusOptionsVisibility);
              }}
            >
              <div>{currentStatus}</div>
              <ChevronsUpDown size={12} color="#a1a1aa" />
              {statusOptionsVisibility && chooseStatus()}
            </div>
          </div>
          <div className={Styles.inputItemContainer}>
            <div>Creation Date</div>
            <input
              type="date"
              name="creationDate"
              style={{ colorScheme: "dark" }}
              value={profileFormData.creationDate}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className={Styles.inputsContainer}>
          <div className={Styles.inputItemContainer}>
            <div>Description</div>
            <textarea
              rows={8}
              cols={42}
              name="description"
              style={{ resize: "none" }}
              value={profileFormData.description}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className={Styles.saveChangesStyle} onClick={handleSaveChanges}>
          Save Changes
        </div>
      </div>
    );
  };

  const chooseForm = () => {
    return (
      <div className={Styles.chooseFormContainer} ref={optionsRef}>
        <div
          className={Styles.chooseFormItem}
          onClick={() => {
            setCurrentFormText("Profile");
            setActiveForm(1);
            setFormOptionsVisiblity(false);
          }}
        >
          <div>Profile</div>
          {activeForm === 1 && <Check size={12} color="#a1a1aa" />}
        </div>
        <div
          className={Styles.chooseFormItem}
          onClick={() => {
            setCurrentFormText("Group");
            setActiveForm(2);
            setFormOptionsVisiblity(false);
          }}
        >
          <div>Group</div>
          {activeForm === 2 && <Check size={12} color="#a1a1aa" />}
        </div>
        <div
          className={Styles.chooseFormItem}
          onClick={() => {
            setCurrentFormText("Triplehook");
            setActiveForm(3);
            setFormOptionsVisiblity(false);
          }}
        >
          <div>Triplehook</div>
          <div>{activeForm === 3 && <Check size={12} color="#a1a1aa" />}</div>
        </div>
      </div>
    );
  };

  const premiumOptions = () => {
    return (
      <div className={Styles.chooseFormContainer} ref={premiumRef}>
        <div
          className={Styles.premiumOptionItem}
          onClick={() => {
            setSelectedPremiumOption("Yes");
            setPremiumOptionsVisibility(false);
          }}
        >
          <div>Yes</div>
          {selectedPremiumOption === "Yes" && (
            <Check size={12} color="#a1a1aa" />
          )}
        </div>
        <div
          className={Styles.premiumOptionItem}
          onClick={() => {
            setSelectedPremiumOption("No");
            setPremiumOptionsVisibility(false);
          }}
        >
          <div>No</div>
          {selectedPremiumOption === "No" && (
            <Check size={12} color="#a1a1aa" />
          )}
        </div>
      </div>
    );
  };

  const chooseStatus = () => {
    return (
      <div className={Styles.chooseStatusContainer} ref={statusRef}>
        <div
          className={Styles.statusOptionItem}
          onClick={() => {
            setCurrentStatus("In Game (Join Button)");
            setStatusOptionsVisibility(false);
          }}
        >
          <div>In Game (join button)</div>
          {currentStatus === "In Game (Join Button)" && (
            <Check size={12} color="#a1a1aa" />
          )}
        </div>
        <div
          className={Styles.statusOptionItem}
          onClick={() => {
            setCurrentStatus("In Studio");
            setStatusOptionsVisibility(false);
          }}
        >
          <div>In Studio</div>
          {currentStatus === "In Studio" && <Check size={12} color="#a1a1aa" />}
        </div>
        <div
          className={Styles.statusOptionItem}
          onClick={() => {
            setCurrentStatus("Online");
            setStatusOptionsVisibility(false);
          }}
        >
          <div>Online</div>
          <div>
            {currentStatus === "Online" && <Check size={12} color="#a1a1aa" />}
          </div>
        </div>
        <div
          className={Styles.statusOptionItem}
          onClick={() => {
            setCurrentStatus("Offline");
            setStatusOptionsVisibility(false);
          }}
        >
          <div>Offline</div>
          <div>
            {currentStatus === "Offline" && <Check size={12} color="#a1a1aa" />}
          </div>
        </div>
      </div>
    );
  };

  //Group form

  const groupForm = () => {
    const handleChange = (e) => {
      const { name, value } = e.target;
      setGroupFormData({
        ...groupFormData,
        [name]: value,
      });
    };

    const handleSaveChanges = () => {
      const updatedGroupFormData = {
        ...groupFormData,
        verifiedBadge: verifiedBadge,
      };

      const isEmptyField = Object.values(updatedGroupFormData).some(
        (value) => value === "" || value === null
      );

      if (isEmptyField) {
        alert("Please fill in all fields.");
        return;
      }

      // Send POST request
      axios
        .post("/api/group", updatedGroupFormData)
        .then((response) => {
          console.log("Group updated successfully", response.data);
        })
        .catch((error) => {
          console.error("There was an error updating the group!", error);
        });
    };

    return (
      <div className={Styles.profileFormContainer}>
        <div className={Styles.inputsContainer}>
          <div className={Styles.inputItemContainer}>
            <div>Real Group URL</div>
            <input
              type="text"
              name="realGroupURL"
              placeholder="https://www.roblox.com/groups/342333048"
              className={Styles.realGroupURLStyle}
              value={groupFormData.realGroupURL}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className={Styles.inputsContainer}>
          <div className={Styles.inputItemContainer}>
            <div style={{ width: "80%" }}>Group Owner {"(Real Name)"}</div>
            <input
              type="text"
              name="groupOwnerName"
              placeholder="Unset"
              value={groupFormData.groupOwnerName}
              onChange={handleChange}
            />
          </div>
          <div className={Styles.inputItemContainer}>
            <div>Group Name</div>
            <input
              type="text"
              name="groupName"
              placeholder="Unset"
              value={groupFormData.groupName}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className={Styles.inputsContainer}>
          <div className={Styles.inputItemContainer}>
            <div>Members</div>
            <input
              type="number"
              name="members"
              placeholder="0"
              className={Styles.numberInputWidth}
              value={groupFormData.members}
              onChange={handleChange}
            />
          </div>
          <div className={Styles.inputItemContainer}>
            <div>Verified Badge</div>
            <div
              className={Styles.formOptionsContainer}
              onClick={() => {
                setBadgeOptionVisibility(!badgeOptionVisibility);
              }}
            >
              <div style={{ width: "40px" }}>{verifiedBadge}</div>
              <ChevronsUpDown size={12} color="#a1a1aa" />
              {badgeOptionVisibility && badgeOptions()}
            </div>
          </div>
          <div className={Styles.inputItemContainer}>
            <div>Funds</div>
            <input
              type="number"
              name="funds"
              placeholder="0"
              className={Styles.numberInputWidth}
              value={groupFormData.funds}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className={Styles.inputsContainer}>
          <div className={Styles.inputItemContainer}>
            <div>Group Description</div>
            <textarea
              rows={8}
              cols={18}
              style={{ resize: "none" }}
              name="groupDescription"
              placeholder="Description Unset"
              className={Styles.groupFormTextarea}
              value={groupFormData.groupDescription}
              onChange={handleChange}
            />
          </div>
          <div className={Styles.inputItemContainer}>
            <div>Group Shout</div>
            <textarea
              rows={8}
              cols={18}
              style={{ resize: "none" }}
              name="groupShout"
              placeholder="Shout Unset"
              className={Styles.groupFormTextarea}
              value={groupFormData.groupShout}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className={Styles.saveChangesStyle} onClick={handleSaveChanges}>
          Save Changes
        </div>
      </div>
    );
  };

  const badgeOptions = () => {
    return (
      <div className={Styles.chooseBadgeContainer} ref={badgeRef}>
        <div
          className={Styles.badgeOptionItem}
          onClick={() => {
            setVerifiedBadge("Yes");
            setBadgeOptionVisibility(false);
          }}
        >
          <div>Yes</div>
          {verifiedBadge === "Yes" && <Check size={12} color="#a1a1aa" />}
        </div>
        <div
          className={Styles.badgeOptionItem}
          onClick={() => {
            setVerifiedBadge("No");
            setBadgeOptionVisibility(false);
          }}
        >
          <div>No</div>
          {verifiedBadge === "No" && <Check size={12} color="#a1a1aa" />}
        </div>
      </div>
    );
  };

  //Triplehook form
  const triplehookForm = () => {
    const handleChange = (e) => {
      const { name, value } = e.target;
      setTriplehookFormData({
        ...triplehookFormData,
        [name]: value,
      });
    };

    const handleCreate = () => {
      const isEmptyField = Object.values(triplehookFormData).some(
        (value) => value === "" || value === null
      );

      if (isEmptyField) {
        alert("Please fill in all fields.");
        return;
      }

      axios
        .post("/api/triplehook", triplehookFormData)
        .then((response) => {
          console.log("Triplehook created successfully", response.data);
        })
        .catch((error) => {
          console.error("There was an error creating the triplehook!", error);
        });
    };

    return (
      <div className={Styles.profileFormContainer}>
        <div className={Styles.inputsContainer}>
          <div className={Styles.inputItemContainer}>
            <div>Directory Name</div>
            <input
              type="text"
              name="directoryName"
              placeholder="Directory Name..."
              value={triplehookFormData.directoryName}
              onChange={handleChange}
            />
          </div>
          <div className={Styles.inputItemContainer}>
            <div>Display Name</div>
            <input
              type="text"
              name="displayName"
              placeholder="ROBLOX"
              value={triplehookFormData.displayName}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className={Styles.inputsContainer}>
          <div className={Styles.inputItemContainer}>
            <div>Invite URL</div>
            <input
              type="text"
              name="inviteURL"
              placeholder="Discord invite URL..."
              className={Styles.realGroupURLStyle}
              value={triplehookFormData.inviteURL}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className={Styles.inputsContainer}>
          <div className={Styles.inputItemContainer}>
            <div>Image URL</div>
            <input
              type="text"
              name="imageURL"
              placeholder="Image URL..."
              className={Styles.realGroupURLStyle}
              value={triplehookFormData.imageURL}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className={Styles.inputsContainer}>
          <div className={Styles.inputItemContainer}>
            <div>Webhook</div>
            <input
              type="text"
              name="webhook"
              placeholder="Discord Webhook..."
              className={Styles.realGroupURLStyle}
              value={triplehookFormData.webhook}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className={Styles.saveChangesStyle} onClick={handleCreate}>
          Create
        </div>
      </div>
    );
  };

  const handleClickOutside = (event) => {
    if (optionsRef.current && !optionsRef.current.contains(event.target)) {
      setFormOptionsVisiblity(false);
    }
    if (premiumRef.current && !premiumRef.current.contains(event.target)) {
      setPremiumOptionsVisibility(false);
    }
    if (statusRef.current && !statusRef.current.contains(event.target)) {
      setStatusOptionsVisibility(false);
    }
    if (badgeRef.current && !badgeRef.current.contains(event.target)) {
      setBadgeOptionVisibility(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <div className={Styles.formCardContainer}>
      <div className={Styles.formContainer}>
        <div
          className={Styles.systemContainer}
          onClick={() => {
            openModal("center");
          }}
        >
          <div>System</div>
          <Cog size={14} color="#fafafa" />
          <div className={Styles.privateServers}>PRIVATE SERVERS</div>
        </div>
        <div
          className={Styles.formOptionsContainer}
          onClick={() => {
            setFormOptionsVisiblity(!formOptionsVisibility);
          }}
        >
          <div>{currentFormText}</div>
          <ChevronsUpDown size={12} color="#a1a1aa" />
          {formOptionsVisibility && chooseForm()}
        </div>
        {activeForm === 1 && profileForm()}
        {activeForm === 2 && groupForm()}
        {activeForm === 3 && triplehookForm()}
      </div>
      <div className={Styles.cardContainer}>
        {activeForm === 1 ? (
          <div className={Styles.cardIcons}>
            <div style={{ fontWeight: "600" }}>ROBLOX</div>
            <Image
              src={"/assets/icons/roblox-logo.webp"}
              width={24}
              height={24}
              alt="roblox logo"
            />
            <div className={Styles.controllerIcon}>
              <Gamepad2 size={16} color="#fafafa" />
            </div>
          </div>
        ) : (
          <div className={Styles.cardIcons} style={{ fontSize: "18px" }}>
            Unset <div />
          </div>
        )}

        <div className={Styles.robloxStyle}>
          {activeForm === 1 ? (
            <Image
              src={"/assets/icons/roblox-builder.png"}
              width={120}
              height={120}
              alt="roblox-builder"
            />
          ) : (
            <Image
              src={"/assets/icons/Roblox_High_School-logo.webp"}
              width={160}
              height={160}
              alt="roblox-high-school"
            />
          )}
        </div>
        <div className={Styles.dateAndCopyContainer}>
          <div className={Styles.copyContainer}>
            <div style={{ fontWeight: "500" }}>Copy URL</div>
            <Copy size={16} color="#fafafa" />
          </div>
          <div className={Styles.dateContainer}>
            <Calendar size={16} color="#fafafa" />
            <div style={{ fontWeight: "500" }}>June 8th, 2024</div>
          </div>
        </div>
      </div>
      <Modal isOpen={isModalOpen} onClose={closeModal} position={modalPosition}>
        <div className={Styles.systemModalContainer}>
          <div className={Styles.modalSwitchContainer}>
            <div
              className={`${Styles.modalSwitchItem} ${
                activeModalSwitch === 1 ? Styles.modalSwitchActiveItem : ""
              }`}
              onClick={() => {
                setActiveModalSwitch(1);
              }}
            >
              Settings
            </div>
            <div
              className={`${Styles.modalSwitchItem} ${
                activeModalSwitch === 2 ? Styles.modalSwitchActiveItem : ""
              }`}
              onClick={() => {
                setActiveModalSwitch(2);
              }}
            >
              Discover
            </div>
          </div>
          {activeModalSwitch === 1 && (
            <div className={Styles.modalSettingsFormContainer}>
              <div style={{ width: "90%" }}>Site ID</div>
              <div className={Styles.modalCopyDiv}>
                <Copy color="#a1a1aa" size={14} style={{ cursor: "pointer" }} />
                <div style={{ color: "#a1a1aa" }}>937450235630</div>
              </div>
              <div style={{ width: "90%" }}>Site Code</div>
              <div className={Styles.modalCopyDiv}>
                <Copy color="#a1a1aa" size={14} style={{ cursor: "pointer" }} />
                <div style={{ color: "#a1a1aa" }}>
                  103867472920586473281819488649
                </div>
              </div>
              <div style={{ width: "90%" }}>Webhook</div>
              <div className={Styles.modalCopyDiv}>
                <Image
                  src={"/assets/icons/icons8-discord-14.png"}
                  width={14}
                  height={14}
                  alt="discord-logo"
                />
                <div style={{ color: "#a1a1aa" }}>
                  https://www.discord.com/webhook/5834523
                </div>
              </div>
              <div style={{ width: "100%" }}>
                <div className={Styles.deleteWebsite}>Delete Website</div>
              </div>
            </div>
          )}
          {activeModalSwitch === 2 && (
            <div className={Styles.modalSettingsFormContainer}>
              <div className={Styles.modalDiscoverDiv}>
                <div style={{ color: "#a1a1aa" }}>Search Game...</div>
                <Search
                  color="#a1a1aa"
                  size={14}
                  style={{ cursor: "pointer" }}
                />
              </div>
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
};

export default SettingForms;
