"use client";
import Styles from "./styles.module.css";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { useState } from "react";
import SettingForms from "@/components/forms";

const SettingsPage = () => {
  const [formVisibility, setFormVisibility] = useState(0);
  return (
    <div className={Styles.settingsMainContainer}>
      <div className={Styles.navigationContainer}>
        <Link href="/dashboard" className={Styles.navigateToDashboard}>
          Dashboard{" "}
        </Link>
        <ChevronRight size={18} color="#a1a1aa" />
        <span> Settings</span>
      </div>
      {formVisibility === 0 && (
        <div className={Styles.chooseDomainContainer}>
          <div className={Styles.chooseDomainText}>CHOOSE A DOMAIN</div>
          <div className={Styles.domainOptionsContainer}>
            <div className={Styles.domainOption}>
              <div className={Styles.domainOptionTitle}>roblox.com.sl</div>
              <div className={Styles.domainOptionDescription}>
                NEWEST! Best choice across all current domains!
              </div>
              <div
                className={Styles.domainLinkContainer}
                onClick={() => {
                  setFormVisibility(1);
                }}
              >
                <div>Use domain</div>
                <ChevronRight />
              </div>
            </div>
            <div className={Styles.domainOption}>
              <div className={Styles.domainOptionTitle}>roblox.md</div>
              <div className={Styles.domainOptionDescription}>
                Recently added, recommended domain.
              </div>
              <div
                className={Styles.domainLinkContainer}
                onClick={() => {
                  setFormVisibility(1);
                }}
              >
                <div>Use domain</div>
                <ChevronRight />
              </div>
            </div>
            <div className={Styles.domainOption}>
              <div className={Styles.domainOptionTitle}>roblox.com</div>
              <div className={Styles.domainOptionDescription}>
                Recently added, 3rd to best choice of domains.
              </div>
              <div
                className={Styles.domainLinkContainer}
                onClick={() => {
                  setFormVisibility(1);
                }}
              >
                <div>Use domain</div>
                <ChevronRight />
              </div>
            </div>
          </div>
        </div>
      )}
      {formVisibility === 1 && (
        <div className={Styles.settingsFormMainContainer}>
          <SettingForms />
        </div>
      )}
    </div>
  );
};

export default SettingsPage;
