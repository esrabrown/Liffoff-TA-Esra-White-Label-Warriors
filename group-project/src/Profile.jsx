import Header from "./components/Header";
import NavBar from "./components/NavBar";
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { jwtDecode } from 'jwt-decode';
import { useParams } from "react-router-dom";
import { googleLogout, useGoogleLogin } from '@react-oauth/google';

import React from 'react';
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBBtn,
  MDBBreadcrumb,
  MDBBreadcrumbItem,
  MDBProgress,
  MDBProgressBar,
  MDBIcon,
  MDBListGroup,
  MDBListGroupItem
} from 'mdb-react-ui-kit';

export default function Profile() {

    const [user, setUser] = useState([]);
    const [favoriteRates, setFavoriteRates] = useState([]);
    const [ profile, setProfile ] = useState([]);

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const token = localStorage.getItem('token');
                if (token) {
                  const res = await axios.get('https://www.googleapis.com/oauth2/v1/userinfo', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        Accept: 'application/json'
                    }
                });
                    const decodedToken = jwtDecode(token);
                    setUser(decodedToken);
                setProfile(res.data);
                } else {
                  setUser(null);
                  setProfile(null);
                }
            } catch (error) {
                console.error('Error fetching user profile:', error);
            }
        };
    
        fetchUserProfile();

    }, []);

  //   const login = useGoogleLogin({
  //     onSuccess: (codeResponse) => setUser(codeResponse),
  //     onError: (error) => console.log('Login Failed:', error)
  // });

//   useEffect(
//     () => {
//         if (user) {
//             axios
//                 .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
//                     headers: {
//                         Authorization: `Bearer ${user.access_token}`,
//                         Accept: 'application/json'
//                     }
//                 })
//                 .then((res) => {
//                     setProfile(res.data);
//                 })
//                 .catch((err) => console.log(err));
//         }
//     },
//     [ user ]
// );

const logOut = () => {
  googleLogout();
  setProfile(null);
};
  //   useEffect(() => {
  //     const displayUserInfo = async () => {
  //       try {
  //         const token = localStorage.getItem('token');
  //         let response;
  //         if (username) {
  //           response = await axios.get(`http://localhost:8080/profile/${username}`, {
  //             headers: {
  //               Authorization: `Bearer ${token}`
  //             }
  //           });
  //         } else {
  //           response = await axios.get("http://localhost:8080/profile", {
  //             headers: {
  //               Authorization: `Bearer ${token}`
  //             }
  //           });
  //         }
  //         setUser(response.data)
  //       } catch(error) {
  //         console.error('No user information', error);
  //       }
  //     };
  // displayUserInfo();
  // }, []);
    

    useEffect(() => {
        const fetchFavoriteRates = async () => {
            try {
                const token = localStorage.getItem('token');
                if (token) {
                    const response = await axios.get('http://localhost:8080/favorite-rates', { // Replace 'favorite-rates' with your actual API endpoint for favorite rates
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });
                    setFavoriteRates(response.data);
                }
            } catch (error) {
                console.error('Error fetching favorite rates:', error);
            }
        };

        fetchFavoriteRates();
    }, []);

  return (
    <section style={{ backgroundColor: '#eee', width: '130%', paddingRight: 600, marginleft: 300 }}>
    <NavBar />
      <MDBContainer className="py-5">
        <MDBRow>
          <MDBCol>
            <MDBBreadcrumb className="bg-light rounded-3 p-3 mb-4">
              <MDBBreadcrumbItem>
                <a href='#'>Home</a>
              </MDBBreadcrumbItem>
              <MDBBreadcrumbItem>
                <a href="#">User</a>
              </MDBBreadcrumbItem>
              <MDBBreadcrumbItem active>User Profile</MDBBreadcrumbItem>
            </MDBBreadcrumb>
          </MDBCol>
        </MDBRow>
        {user ? (
        <MDBRow>
          <MDBCol lg="4">
            <MDBCard className="mb-4">
              <MDBCardBody className="text-center">
                <MDBCardImage
                  src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
                  alt="avatar"
                  className="rounded-circle"
                  style={{ width: '150px' }}
                  fluid />
                <p className="text-muted mb-4">Trip Wallet Member</p>
                <p className="text-muted mb-4">{profile.name}</p>
              </MDBCardBody>
            </MDBCard>

            <MDBCard className="mb-4 mb-lg-0">
              <MDBCardBody className="p-0">
                <MDBListGroup flush className="rounded-3">
                  <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                    <MDBIcon fab icon="google fa-lg" style={{ color: '#55acee' }} />
                    <MDBCardText>{profile.email}</MDBCardText>
                  </MDBListGroupItem>
                </MDBListGroup>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
          <MDBCol lg="8">
            <MDBCard className="mb-4">
              <MDBCardBody>
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Name</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">{profile.name} {user.lastName}</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Username</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">{user.username}</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Home Currency</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">{user.defaultCurrency}</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
              </MDBCardBody>
            </MDBCard>

            <MDBRow>
              <MDBCol md="6">
                {favoriteRates.length > 0 && (
                    <MDBCard className="mb-4 mb-md-0">
                        <MDBCardBody>
                            <MDBCardText className="mb-4">Favorite Currency Exchange Rates</MDBCardText>
                                <MDBListGroup flush className="rounded-3">
                                    {favoriteRates.map(rate => (
                                        <MDBListGroupItem key={rate.id}>
                                            {rate.currencyPair} - {rate.rate}
                                        </MDBListGroupItem>
                                    ))}
                                </MDBListGroup>
                        </MDBCardBody>
                    </MDBCard>
                )}
              </MDBCol>
            </MDBRow>
          </MDBCol>

          
        </MDBRow>
        ) : (
            <MDBRow>
            <MDBCol>
              <MDBCard className="mb-4">
                <MDBCardBody>
                  <MDBCardText className="text-center text-muted">
                    Profile not available
                  </MDBCardText>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          </MDBRow>
        )}
      </MDBContainer>
    </section>
  );
}