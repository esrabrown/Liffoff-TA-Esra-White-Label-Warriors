//imports



// export default function UserEditProfile {

//     let navigate = useNavigate();

//     const { id } = useParams();
  
//     const [user, setUser] = useState({
//         firstName: "",
//         lastName: "",
//         username: "",
//         defaultCurrency:"",
//         password:""
//     });
  
//     const { firstName, lastName, username, defaultCurrency, password } = user;
  
//     const onInputChange = (e) => {
//       setUser({ ...user, [e.target.name]: e.target.value });
//     };
  
//     useEffect(() => {
//       loadUser();
//     }, []);
  
//     const onSubmit = async (e) => {
//       e.preventDefault();
//       await axios.put(`http://localhost:8080/profile/${id}`, user);
//       navigate("/");
//     };
  
//     const loadUser = async () => {
//       const result = await axios.get(`http://localhost:8080/profile/${id}`);
//       setUser(result.data);
//     };
  
//     return (
//       <div className="container">
//         <div className="row">
//           <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
//             <h2 className="text-center m-4">Edit User</h2>
  
//             <form onSubmit={(e) => onSubmit(e)}>
//               <div className="mb-3">
//                 <label htmlFor="Name" className="form-label">
//                   Name
//                 </label>
//                 <input
//                   type={"text"}
//                   className="form-control"
//                   placeholder="Enter your first name"
//                   name="name"
//                   value={firstName}
//                   onChange={(e) => onInputChange(e)}
//                 />
//               </div>
//               <div className="mb-3">
//                 <label htmlFor="Username" className="form-label">
//                   Username
//                 </label>
//                 <input
//                   type={"text"}
//                   className="form-control"
//                   placeholder="Enter your username"
//                   name="username"
//                   value={username}
//                   onChange={(e) => onInputChange(e)}
//                 />
//               </div>
//               <div className="mb-3">
//                 <label htmlFor="Default Currency" className="form-label">
//                   Default Currency
//                 </label>
//                 <input
//                   type={"text"}
//                   className="form-control"
//                   placeholder="Select your default currency"
//                   name="default"
//                   value={email}
//                   onChange={(e) => onInputChange(e)}
//                 />
//               </div>
//               <button type="submit" className="btn btn-outline-primary">
//                 Submit
//               </button>
//               <Link className="btn btn-outline-danger mx-2" to="/">
//                 Cancel
//               </Link>
//             </form>
//           </div>
//         </div>
//       </div>
//     );   
// }