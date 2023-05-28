import React, { useState, useEffect } from "react";
import { PageContainer } from "../components/GlobalStyles/PageStyles";
import "./Admin.css";
import { useQuery } from "@apollo/client";
import { GET_ADMIN_DASHBOARD_DATA } from "../graphql/queries/adminQueries";
import { Chart } from "react-google-charts";
const Admin = () => {
  const { data } = useQuery(GET_ADMIN_DASHBOARD_DATA);
  const [dashboardData, setDashboardData] = useState(null);
  useEffect(() => {
    localStorage.removeItem("user");
    setDashboardData(data);
    console.log(data);
    console.log("Data for Bookings", constructDataForBookings(data));
  }, [data]);
  const [userHashMap, setUserHashMap] = useState(new Map());
  function constructDataForBookings(data1) {
    const bookings = data1?.getAllBookings;
    let tempHashMap = userHashMap;
    for (let i = 0; i < bookings?.length; i++) {
      let currentBooking = bookings[i];
      if (tempHashMap.has(currentBooking?.bookedBy?.id))
        tempHashMap.set(
          currentBooking?.bookedBy?.id,
          tempHashMap.get(currentBooking?.bookedBy?.id) + 1
        );
      else tempHashMap.set(currentBooking?.bookedBy?.id, 1);
    }
    setUserHashMap(tempHashMap);
  }
  const getRole = (e) => {
    if (e?.isAdmin) return "Admin";
    if (e?.isManager) return "Manager";
    else return "User";
  };
  return (
    <PageContainer>
      <div className="cards-parent">
        <div className="card bg-1">
          <div>
            <img src="https://cdn-icons-png.flaticon.com/512/3009/3009710.png" />
          </div>
          <div>
            <div className="count">{data?.getAllHotels.length}</div>
            <div className="value">Hotels</div>
          </div>
        </div>
        <div className="card bg-2">
          <div>
            <img src="https://cdn-icons-png.flaticon.com/512/2460/2460737.png " />
          </div>
          <div>
            <div className="count">{data?.getAllBookings.length}</div>
            <div className="value">Bookings</div>
          </div>
        </div>
        <div className="card bg-3">
          <div>
            <img src="https://cdn-icons-png.flaticon.com/512/681/681494.png" />
          </div>
          <div>
            <div className="count">
              {
                data?.getAllTypesUsers.filter((e) => !e.isAdmin && !e.isManager)
                  .length
              }
            </div>
            <div className="value">Users</div>
          </div>
        </div>
        <div className="card bg-4">
          <div>
            <img src="https://cdn-icons-png.flaticon.com/512/1283/1283342.png" />
          </div>
          <div>
            <div className="count">
              {data?.getAllTypesUsers.filter((e) => e.isManager).length}
            </div>
            <div className="value">Partners</div>
          </div>
        </div>
      </div>
      <div className="d-flex">
        <div>
          <div class="container">
            <div className="tableHeading">Bookings</div>
            <div class="table">
              <div class="table-header">
                <div class="header__item">
                  <a id="name" class="filter__link" href="#">
                    Id
                  </a>
                </div>
                <div class="header__item">
                  <a
                    id="wins"
                    class="filter__link filter__link--number"
                    href="#"
                  >
                    BookedBy
                  </a>
                </div>
                <div class="header__item">
                  <a
                    id="draws"
                    class="filter__link filter__link--number"
                    href="#"
                  >
                    BookedOn
                  </a>
                </div>
                <div class="header__item">
                  <a
                    id="losses"
                    class="filter__link filter__link--number"
                    href="#"
                  >
                    HotelId
                  </a>
                </div>
                <div class="header__item">
                  <a
                    id="total"
                    class="filter__link filter__link--number"
                    href="#"
                  >
                    Amount
                  </a>
                </div>
              </div>
              <div class="table-content">
                {data &&
                  data?.getAllBookings.map((e) => (
                    <div class="table-row">
                      <div class="table-data">{e?.id}</div>
                      <div class="table-data">{e?.bookedBy?.id}</div>
                      <div class="table-data">{e.bookedOn}</div>
                      <div class="table-data">{e?.hotel.id}</div>
                      <div class="table-data">{e?.amount}</div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
        <div>
          <div class="container">
            <div className="tableHeading">Users</div>
            <div class="table">
              <div class="table-header">
                <div class="header__item">
                  <a id="name" class="filter__link" href="#">
                    Id
                  </a>
                </div>
                <div class="header__item">
                  <a
                    id="wins"
                    class="filter__link filter__link--number"
                    href="#"
                  >
                    Name
                  </a>
                </div>
                <div class="header__item">
                  <a
                    id="draws"
                    class="filter__link filter__link--number"
                    href="#"
                  >
                    Username
                  </a>
                </div>
                <div class="header__item">
                  <a
                    id="draws"
                    class="filter__link filter__link--number"
                    href="#"
                  >
                    Role
                  </a>
                </div>
                <div class="header__item">
                  <a
                    id="losses"
                    class="filter__link filter__link--number"
                    href="#"
                  >
                    Joined On
                  </a>
                </div>
                <div class="header__item">
                  <a
                    id="total"
                    class="filter__link filter__link--number"
                    href="#"
                  >
                    Total Bookings
                  </a>
                </div>
              </div>
              <div class="table-content">
                {data &&
                  data?.getAllTypesUsers.map((e) => (
                    <div class="table-row">
                      <div class="table-data">{e?.id}</div>
                      <div class="table-data">{e?.name}</div>
                      <div class="table-data">{e.username}</div>
                      <div class="table-data">{getRole(e)}</div>
                      <div class="table-data">{e.joined}</div>
                      <div class="table-data">
                        {userHashMap.get(e.id) || "0"}
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageContainer>
  );
};

export default Admin;
