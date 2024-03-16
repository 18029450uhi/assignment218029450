import moment from "moment";
import React, { useEffect } from "react";

const UserList = ({
  userData,
  findExistingUser,
  setSelectedUser,
  selectedUser,
}) => {
  const userList = userData?.filter(
    (user) => user?.email !== findExistingUser?.email
  );

  useEffect(() => {
    setSelectedUser(userList[0]?.email);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="p-4 pt-0  ">
      <p className="fw-bold">Chat History</p>
      <div className="">
      {findExistingUser?.role === "admin" ? (
        userList?.map((user) => (
          <div
            key={user.id}
            className={`d-flex align-items-center ${
              user.email === selectedUser ? "bg-dark text-light" : "bg-light"
            }  px-4 py-2 rounded mb-2`}
            style={{ cursor: "pointer", border: "1px solid" }}
            onClick={() => setSelectedUser(user.email)}
          >
            <img
              style={{ width: "50px", height: "50px" }}
              className="rounded-circle"
              src={user.photoURL}
              alt=""
            />
            <p key={user.id} className="m-3 fw-bold">
              {user.displayName} -{" "}
              <span className="fw-normal" style={{ fontSize: "12px" }}>
                {" "}
                {moment(user?.lastMessageTimestamp)?.fromNow()}
              </span>
            </p>
          </div>
        ))
      ) : (
        <div className="bg-dark text-light px-4 py-2 rounded">
          <svg
            width="25px"
            height="25px"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              {" "}
              <path
                d="M11 21H4C4 17.4735 6.60771 14.5561 10 14.0709M19.8726 15.2038C19.8044 15.2079 19.7357 15.21 19.6667 15.21C18.6422 15.21 17.7077 14.7524 17 14C16.2923 14.7524 15.3578 15.2099 14.3333 15.2099C14.2643 15.2099 14.1956 15.2078 14.1274 15.2037C14.0442 15.5853 14 15.9855 14 16.3979C14 18.6121 15.2748 20.4725 17 21C18.7252 20.4725 20 18.6121 20 16.3979C20 15.9855 19.9558 15.5853 19.8726 15.2038ZM15 7C15 9.20914 13.2091 11 11 11C8.79086 11 7 9.20914 7 7C7 4.79086 8.79086 3 11 3C13.2091 3 15 4.79086 15 7Z"
                stroke="#ffffff"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>{" "}
            </g>
          </svg>

          <span className="m-2">Admin</span>
        </div>
      )}
      </div>
    </div>
  );
};

export default UserList;
