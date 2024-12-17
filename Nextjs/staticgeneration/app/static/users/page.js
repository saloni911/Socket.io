
async function fetchUsers() {
    const response = await fetch("https://dummyjson.com/users");
    if (!response.ok) {
      throw new Error("Failed to fetch users");
    }
    return response.json();
  }
  
  const UserPage = async () => {
    const data = await fetchUsers();
  
    return (
      <div>
        <h1>User Page (SSG)</h1>
        <ul>
          {data.users.map((user) => (
            <ul key={user.id}>
              {user.firstName} {user.lastName} - {user.email}
            </ul>
          ))}
        </ul>
      </div>
    );
  };
  
  export default UserPage;
  