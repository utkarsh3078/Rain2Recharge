import React, { useState } from "react";
import Icon from "../../../components/AppIcon";
import Button from "../../../components/ui/Button";

const NotificationSettings = ({ settings, onSettingsChange }) => {
  const [activeTab, setActiveTab] = useState("preferences");

  const tabs = [
    { id: "preferences", name: "Preferences", icon: "Settings" },
    { id: "channels", name: "Channels", icon: "MessageSquare" },
    { id: "privacy", name: "Privacy", icon: "Shield" },
    { id: "data", name: "Data Control", icon: "Database" },
  ];

  const notificationTypes = [
    {
      id: "maintenance",
      title: "Maintenance Reminders",
      description: "Get notified about upcoming system maintenance tasks",
      icon: "Wrench",
      frequency: ["immediate", "daily", "weekly", "monthly"],
      enabled: settings?.maintenance?.enabled || false,
    },
    {
      id: "community",
      title: "Community Updates",
      description:
        "News and updates from your local water conservation community",
      icon: "Users",
      frequency: ["daily", "weekly", "monthly"],
      enabled: settings?.community?.enabled || false,
    },
    {
      id: "seasonal",
      title: "Seasonal Tips",
      description:
        "Seasonal optimization tips and weather-related recommendations",
      icon: "Sun",
      frequency: ["weekly", "monthly", "seasonal"],
      enabled: settings?.seasonal?.enabled || false,
    },
    {
      id: "regulatory",
      title: "Regulatory Changes",
      description: "Updates on local water regulations and incentive programs",
      icon: "FileText",
      frequency: ["immediate", "weekly", "monthly"],
      enabled: settings?.regulatory?.enabled || false,
    },
    {
      id: "achievements",
      title: "Achievements & Milestones",
      description:
        "Celebrate your water conservation achievements and milestones",
      icon: "Award",
      frequency: ["immediate", "weekly"],
      enabled: settings?.achievements?.enabled || false,
    },
    {
      id: "system",
      title: "System Performance",
      description: "Alerts about system performance and efficiency metrics",
      icon: "Activity",
      frequency: ["immediate", "daily", "weekly"],
      enabled: settings?.system?.enabled || false,
    },
  ];

  const communicationChannels = [
    {
      id: "email",
      name: "Email",
      icon: "Mail",
      enabled: settings?.channels?.email || false,
      address: "sarah.johnson@email.com",
    },
    {
      id: "sms",
      name: "SMS",
      icon: "MessageSquare",
      enabled: settings?.channels?.sms || false,
      address: "+1 (555) 123-4567",
    },
    {
      id: "push",
      name: "Push Notifications",
      icon: "Bell",
      enabled: settings?.channels?.push || false,
      address: "Browser & Mobile App",
    },
    {
      id: "whatsapp",
      name: "WhatsApp",
      icon: "MessageCircle",
      enabled: settings?.channels?.whatsapp || false,
      address: "+1 (555) 123-4567",
    },
  ];

  const privacySettings = [
    {
      id: "profile-visibility",
      title: "Profile Visibility",
      description: "Control who can see your profile and achievements",
      options: ["public", "community", "private"],
      current: "community",
    },
    {
      id: "data-sharing",
      title: "Data Sharing",
      description:
        "Share anonymized data to help improve water conservation efforts",
      type: "toggle",
      enabled: true,
    },
    {
      id: "location-sharing",
      title: "Location Sharing",
      description:
        "Share your location for local recommendations and community features",
      type: "toggle",
      enabled: true,
    },
    {
      id: "vendor-contact",
      title: "Vendor Contact",
      description: "Allow verified vendors to contact you with relevant offers",
      type: "toggle",
      enabled: false,
    },
  ];

  const handleToggle = (category, id, value) => {
    const newSettings = {
      ...settings,
      [category]: {
        ...settings?.[category],
        [id]: value,
      },
    };
    onSettingsChange(newSettings);
  };

  const renderPreferences = () => (
    <div className="space-y-6">
      {notificationTypes?.map((type) => (
        <div key={type?.id} className="p-4 border border-border rounded-lg">
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <Icon
                  name={type?.icon}
                  size={20}
                  color="var(--color-primary)"
                />
              </div>
              <div>
                <h3 className="font-semibold text-text-primary mb-1">
                  {type?.title}
                </h3>
                <p className="text-sm text-text-secondary">
                  {type?.description}
                </p>
              </div>
            </div>

            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={type?.enabled}
                onChange={(e) =>
                  handleToggle("notifications", type?.id, {
                    enabled: e?.target?.checked,
                  })
                }
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-muted peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
            </label>
          </div>

          {type?.enabled && (
            <div className="ml-13 space-y-2">
              <label className="block text-sm font-medium text-text-primary">
                Frequency:
              </label>
              <select className="px-3 py-2 border border-border rounded-lg bg-white text-text-primary focus:ring-2 focus:ring-primary focus:border-primary">
                {type?.frequency?.map((freq) => (
                  <option key={freq} value={freq}>
                    {freq?.charAt(0)?.toUpperCase() + freq?.slice(1)}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>
      ))}
    </div>
  );

  const renderChannels = () => (
    <div className="space-y-4">
      {communicationChannels?.map((channel) => (
        <div key={channel?.id} className="p-4 border border-border rounded-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <Icon
                  name={channel?.icon}
                  size={20}
                  color="var(--color-primary)"
                />
              </div>
              <div>
                <h3 className="font-semibold text-text-primary">
                  {channel?.name}
                </h3>
                <p className="text-sm text-text-secondary">
                  {channel?.address}
                </p>
              </div>
            </div>

            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={channel?.enabled}
                onChange={(e) =>
                  handleToggle("channels", channel?.id, e?.target?.checked)
                }
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-muted peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
            </label>
          </div>
        </div>
      ))}

      <div className="mt-6 p-4 bg-muted rounded-lg">
        <h3 className="font-medium text-text-primary mb-2">Quiet Hours</h3>
        <p className="text-sm text-text-secondary mb-4">
          Set times when you don't want to receive notifications
        </p>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-text-primary mb-1">
              Start Time
            </label>
            <input
              type="time"
              defaultValue="22:00"
              className="w-full px-3 py-2 border border-border rounded-lg bg-white text-text-primary focus:ring-2 focus:ring-primary focus:border-primary"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-text-primary mb-1">
              End Time
            </label>
            <input
              type="time"
              defaultValue="08:00"
              className="w-full px-3 py-2 border border-border rounded-lg bg-white text-text-primary focus:ring-2 focus:ring-primary focus:border-primary"
            />
          </div>
        </div>
      </div>
    </div>
  );

  const renderPrivacy = () => (
    <div className="space-y-6">
      {privacySettings?.map((setting) => (
        <div key={setting?.id} className="p-4 border border-border rounded-lg">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3 className="font-semibold text-text-primary mb-1">
                {setting?.title}
              </h3>
              <p className="text-sm text-text-secondary mb-3">
                {setting?.description}
              </p>

              {setting?.options && (
                <select className="px-3 py-2 border border-border rounded-lg bg-white text-text-primary focus:ring-2 focus:ring-primary focus:border-primary">
                  {setting?.options?.map((option) => (
                    <option
                      key={option}
                      value={option}
                      selected={option === setting?.current}
                    >
                      {option?.charAt(0)?.toUpperCase() + option?.slice(1)}
                    </option>
                  ))}
                </select>
              )}
            </div>

            {setting?.type === "toggle" && (
              <label className="relative inline-flex items-center cursor-pointer ml-4">
                <input
                  type="checkbox"
                  checked={setting?.enabled}
                  onChange={(e) =>
                    handleToggle("privacy", setting?.id, e?.target?.checked)
                  }
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-muted peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </label>
            )}
          </div>
        </div>
      ))}
    </div>
  );

  const renderDataControl = () => (
    <div className="space-y-6">
      <div className="p-4 border border-border rounded-lg">
        <h3 className="font-semibold text-text-primary mb-3">Data Export</h3>
        <p className="text-sm text-text-secondary mb-4">
          Download all your data in a portable format
        </p>
        <Button variant="outline" iconName="Download" iconPosition="left">
          Export My Data
        </Button>
      </div>

      <div className="p-4 border border-border rounded-lg">
        <h3 className="font-semibold text-text-primary mb-3">
          Account Deletion
        </h3>
        <p className="text-sm text-text-secondary mb-4">
          Permanently delete your account and all associated data
        </p>
        <Button variant="destructive" iconName="Trash2" iconPosition="left">
          Delete Account
        </Button>
      </div>

      <div className="p-4 border border-border rounded-lg">
        <h3 className="font-semibold text-text-primary mb-3">Data Retention</h3>
        <p className="text-sm text-text-secondary mb-4">
          Control how long we keep your data
        </p>
        <select className="px-3 py-2 border border-border rounded-lg bg-white text-text-primary focus:ring-2 focus:ring-primary focus:border-primary">
          <option value="1year">1 Year</option>
          <option value="2years">2 Years</option>
          <option value="5years" selected>
            5 Years
          </option>
          <option value="indefinite">Indefinite</option>
        </select>
      </div>
    </div>
  );

  return (
    <div className="bg-white rounded-xl shadow-md border border-border p-6">
      <div className="flex items-center gap-2 mb-6">
        <Icon name="Settings" size={24} color="var(--color-primary)" />
        <h2 className="text-xl font-bold text-text-primary">
          Notification & Privacy Settings
        </h2>
      </div>
      {/* Tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        {tabs?.map((tab) => (
          <button
            key={tab?.id}
            onClick={() => setActiveTab(tab?.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
              activeTab === tab?.id
                ? "bg-primary text-primary-foreground shadow-brand"
                : "bg-muted text-text-secondary hover:bg-hover hover:text-text-primary"
            }`}
          >
            <Icon name={tab?.icon} size={16} />
            {tab?.name}
          </button>
        ))}
      </div>
      {/* Tab Content */}
      <div className="min-h-[400px]">
        {activeTab === "preferences" && renderPreferences()}
        {activeTab === "channels" && renderChannels()}
        {activeTab === "privacy" && renderPrivacy()}
        {activeTab === "data" && renderDataControl()}
      </div>
      {/* Save Button */}
      <div className="flex justify-end pt-6 border-t border-border">
        <Button variant="default" iconName="Save" iconPosition="left">
          Save Settings
        </Button>
      </div>
    </div>
  );
};

export default NotificationSettings;
