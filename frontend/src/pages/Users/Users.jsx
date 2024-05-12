import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import SearchInput from '../../components/SearchInput/SearchInput';
import Subheader from '../../components/Subheader/Subheader';
import NoProfileImage from '../../assets/no-profile-image.png';
import styles from './Users.module.scss';
import { useEffect, useState } from 'react';
import { fetchUsers } from '../../api/users';

const Users = () => {
  const [users, setUsers] = useState(null);
  const [filteredUsers, setFilteredUsers] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchUsers();
        setUsers(response.data);
        setFilteredUsers(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const searchUsersByEmail = (query) => {
    if (!query) {
      setFilteredUsers(users);
    }

    const normalizedQuery = query.toLowerCase();

    const filteredResults = users.filter((user) => {
      const normalizedEmail = user.email.toLowerCase();

      return normalizedEmail.includes(normalizedQuery);
    });

    setFilteredUsers(filteredResults);
  };

  return (
    <>
      <Subheader className={styles.subheader}>
        <Grid container spacing={3} display={'flex'} alignItems={'center'}>
          <Grid item xs={12}>
            <SearchInput onChange={(e) => searchUsersByEmail(e.target.value)} placeholder="Search Users" />
          </Grid>
        </Grid>
      </Subheader>
      <div className={styles.container}>
        {filteredUsers !== null && filteredUsers.length > 0 && (
          <Grid container spacing={3}>
            {filteredUsers.map((item) => (
              <Grid key={item._id} item xs={4}>
                <Box display={'flex'} gap={1.5}>
                  <Grid item xs={2}>
                    <img className={styles.image} src={NoProfileImage} alt={item.email} />
                  </Grid>
                  <Grid
                    item
                    xs={10}
                    display={'flex'}
                    flexDirection={'column'}
                    justifyContent={'center'}
                    gap={1.3}
                    sx={{ wordBreak: 'break-word' }}
                  >
                    <Box display={'flex'} flexDirection={'column'} gap={1.3}>
                      <span className={styles.detailMainText}>{item.email}</span>
                      <span className={styles.detailSecondText}>{item.createdAt}</span>
                    </Box>
                  </Grid>
                </Box>
              </Grid>
            ))}
          </Grid>
        )}
        {filteredUsers !== null && filteredUsers.length === 0 && <span>No results</span>}
      </div>
    </>
  );
};

export default Users;
