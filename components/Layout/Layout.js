import { logout } from "apis/auth";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import Script from "next/script";
import { useAuth } from "providers/AuthProvider";
import { useEffect } from "react";
import { toast } from "react-toastify";
import store from "store";

export default function Layout({ children }) {
  const router = useRouter();
  const { setUser, setToken } = useAuth();

  const handleLogout = async () => {
    try {
      const res = await logout();

      store.remove("token");
      store.remove("user");
      setUser(null);
      setToken(null);
      router.push("/");
    } catch (error) {
      toast.error("Something went wrong");
    }
  };
  useEffect(() => {
    let sidebar = document.querySelector(".sidebar");
    let closeBtn = document.querySelector("#btn");

    closeBtn.addEventListener("click", () => {
      sidebar.classList.toggle("open");
      menuBtnChange(); //calling the function(optional)
    });

    // following are the code to change sidebar button(optional)
    function menuBtnChange() {
      if (sidebar.classList.contains("open")) {
        closeBtn.classList.replace("bx-menu", "bx-menu-alt-right"); //replacing the iocns class
      } else {
        closeBtn.classList.replace("bx-menu-alt-right", "bx-menu"); //replacing the iocns class
      }
    }
  });
  return (
    <>
      <Head>
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"
          rel="stylesheet"
          integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3"
          crossOrigin="anonymous"
        ></link>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"
          integrity="sha512-Fo3rlrZj/k7ujTnHg4CGR2D7kSs0v4LLanw2qksYuRlEzO+tcaEPQogQ0KaoGN26/zrn20ImR1DfuLWnOo7aBA=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
        <link
          href="https://unpkg.com/boxicons@2.0.7/css/boxicons.min.css"
          rel="stylesheet"
        />
      </Head>
      <div className="sidebar">
        <div className="logo-details">
          <div className="logo_name">Admin</div>
          <i className="bx bx-menu" id="btn"></i>
        </div>
        <ul className="nav-list ">
          <li>
            <Link href="/users">
              <a>
                <i className="bx bx-user-circle"></i>
                <span className="links_name">Users</span>
              </a>
            </Link>
            <span className="tooltip">Users</span>
          </li>
          <li>
            <Link href="/managers">
              <a>
                <i className="bx bx-user-circle"></i>
                <span className="links_name">Managers</span>
              </a>
            </Link>
            <span className="tooltip">Managers</span>
          </li>
          <li>
            <Link href="/approvers">
              <a>
                <i className="bx bx-user-circle"></i>
                <span className="links_name">Approvers</span>
              </a>
            </Link>
            <span className="tooltip">Approvers</span>
          </li>
          <li>
            <Link href="/applications">
              <a>
                <i className="bx bx-clipboard"></i>
                <span className="links_name">Applications</span>
              </a>
            </Link>
            <span className="tooltip">Applications</span>
          </li>
          <li>
            <Link href="/subdivisions">
              <a>
                <i className="bx bx-list-ul"></i>
                <span className="links_name">Subdivisions</span>
              </a>
            </Link>
            <span className="tooltip">Subdivisions</span>
          </li>
          <li>
            <Link href="/housing-models">
              <a>
                <i className="bx bx-list-ul"></i>
                <span className="links_name">Housign Models</span>
              </a>
            </Link>
            <span className="tooltip">Housing Models</span>
          </li>
          <li>
            <Link href="/messages">
              <a>
                <i className="bx bx-message"></i>
                <span className="links_name">Messages</span>
              </a>
            </Link>
            <span className="tooltip">Messages</span>
          </li>
          <li className="profile">
            <div className="profile-details">
              {/* <img src="profile.jpg" alt="profileImg" /> */}
              <div className="name_job">
                <div className="name">Parag Khan</div>
                <div className="job">Web designer</div>
              </div>
            </div>
            <i
              onClick={handleLogout}
              className="bx bx-log-out cursor-pointer"
              id="log_out"
            ></i>
          </li>
        </ul>
      </div>
      <section className="home-section">{children}</section>
      <Script
        src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p"
        crossOrigin="anonymous"
      />
    </>
  );
}
