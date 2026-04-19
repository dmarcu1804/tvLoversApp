import { useEffect, useState } from 'react';
import styles from './Tabs.module.css';

export const Tabs = ({ tabs, activeTab, onTabChange }) => {
  const tab = tabs.map(({ label, id }) => label);
  const content = tabs.map(({ content }) => content);
  const [activeTabId, setActiveTabId] = useState(activeTab);

  const handleTabChange = (tabId) => {
    setActiveTabId(tabId);
    onTabChange(tabId);
  };

  useEffect(() => {
    setActiveTabId(activeTab);
  }, [activeTab]);

  return (
    <div className={styles.tabsContainer}>
      <div className={styles.tabs}>
        {tab.map((label, index) => (
          <div
            key={index}
            onClick={() => handleTabChange(tabs[index].id)}
            className={`${styles.tab} ${activeTabId === tabs[index].id ? styles.active : ''}`}
          >
            {label}
          </div>
        ))}
      </div>
      {content.map((content, index) => (
        <div
          key={index}
          className={`${styles.tabContent} ${activeTabId === tabs[index].id ? styles.active : ''}`}
        >
          {content}
        </div>
      ))}
    </div>
  );
};
