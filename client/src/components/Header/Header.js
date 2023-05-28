import React, { useContext } from "react";
import "./header.css";
import { GlobalContext } from "../../utils/Context";
import styled from "styled-components";
import { PageTitle } from "../GlobalStyles/PageStyles";
import HotelLogo from "../../assets/logo.png";
import { Link } from "react-router-dom";

const FixedHeader = styled.div`
  padding: 12px 16px;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 9999;
`;

const Content = styled.div`
  display: flex;
  align-items: center;
  column-gap: 16px;
  justify-content: space-between;
`;

const Logo = styled.div`
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  img {
    height: 100%;
  }
`;

const Header = (props) => {
  const { setMenuOpen, menuOpen } = useContext(GlobalContext);
  let pageName = props.page;

  const user = JSON.parse(localStorage.getItem("user"));

  const getFirstName = (name) => {
    let names = name.split(" ");
    if (names.length > 0) return names[0];
    else return name;
  };

  return (
    <FixedHeader
      style={
        menuOpen
          ? { backgroundColor: "#fff", backdropFilter: "blur(0px)" }
          : pageName === "Home"
          ? {}
          : { background: "white" }
      }
    >
      <Content>
        <div className="brand">
          <Link to="/">
            <Logo>
              <img
                src={
                  "data:image/png;base64,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"
                }
                alt="/"
              />
            </Logo>
          </Link>
          <PageTitle style={menuOpen ? { color: "black" } : {}}>
            {pageName}
          </PageTitle>
        </div>
        {user && (
          <div
            className="collection"
            style={{ display: "flex", alignItems: "center" }}
          >
            <p
              className="user-name"
              style={{
                display: `${
                  pageName === "Home" && !menuOpen ? "block" : "none"
                }`,
              }}
            >
              Hello, {getFirstName(user.name)}
            </p>
            <div
              class={`menu-icon ${menuOpen ? "close-icon" : ""}`}
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <div class="leftright"></div>
              <div class="rightleft"></div>
            </div>
          </div>
        )}
      </Content>
    </FixedHeader>
  );
};

export default Header;
