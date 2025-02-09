"use client"

import { useNavigate } from 'react-router-dom';
import { GiMining, GiWaterRecycling, GiSpaceShuttle } from 'react-icons/gi';
import styles from './RoleSelection.module.css';

const RoleSelection = () => {
  const navigate = useNavigate();

  const roles = [
    {
      id: 'mining',
      icon: <GiMining />,
      title: 'Mining & Underground Sustainability',
      description: 'Lead a mining company and balance resource extraction with environmental protection.',
      path: '/mining'
    },
    {
      id: 'ocean',
      icon: <GiWaterRecycling />,
      title: 'Ocean Conservation & Exploration',
      description: 'Protect marine ecosystems while supporting sustainable fishing practices.',
      path: '/ocean'
    },
    {
      id: 'space',
      icon: <GiSpaceShuttle />,
      title: 'Space Colonization & Resource Management',
      description: 'Manage a Mars colony and ensure its sustainable development.',
      path: '/space'
    }
  ];

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Choose Your Adventure</h2>
      <div className={styles.rolesGrid}>
        {roles.map((role) => (
          <div 
            key={role.id}
            className={styles.roleCard}
            onClick={() => navigate(role.path)}
          >
            <div className={styles.roleIcon}>{role.icon}</div>
            <h3 className={styles.roleTitle}>{role.title}</h3>
            <p className={styles.roleDescription}>{role.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RoleSelection;

