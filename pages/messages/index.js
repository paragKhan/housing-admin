import axios from "apis/axios";
import Layout from "components/Layout/Layout";
import withAuth from "HOC/withAuth";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

function Messages() {
  const [data, setData] = useState({});
  const [messages, setMessages] = useState([]);
  const [deps, setDeps] = useState(0);
  const router = useRouter();

  const { paginate } = router.query;
  const current_page = paginate || 1;

  const handleDelete = (id) => {
    axios
      .delete(`/messages/${id}`)
      .then((res) => {
        setMessages(messages.filter((message) => message.id !== id));
        toast.success("Message deleted successfully");
      })
      .catch((err) => {});
  };

  useEffect(() => {
    axios
      .get(`/messages?page=${current_page}`)
      .then((res) => {
        setData(res.data);
        setMessages(res.data.data);
      })
      .catch((err) => {});
  }, [deps, current_page]);

  return (
    <Layout>
      <h1>Messages</h1>
      {messages && (
        <div className="card">
          <div className="card body">
            <table className="table mt-5">
              <thead>
                <tr>
                  <th scope="col">Name</th>
                  <th scope="col">Email</th>
                  <th scope="col">Details</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {messages &&
                  messages.map((message) => (
                    <tr key={message.id}>
                      <td>{message.name}</td>
                      <td>{message.email}</td>
                      <td>{message.details.substr(0, 50)}...</td>
                      <td>
                        <Link href={`/messages/${message.id}`}>
                          <a className="btn btn-sm btn-info">
                            <i className="fas fa-eye"></i>
                          </a>
                        </Link>
                        <button
                          onClick={() => handleDelete(message.id)}
                          className="ms-3 btn btn-sm btn-danger"
                        >
                          <i className="fas fa-trash"></i>
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
            <div className="p-3 d-flex justify-content-end">
              {data.prev_page_url && (
                <Link href={`/messages?paginate=${data.current_page - 1}`}>
                  <a>{"<< prev"}</a>
                </Link>
              )}
              {data.next_page_url && (
                <Link href={`/messages?paginate=${data.current_page + 1}`}>
                  <a>{"next >>"}</a>
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}

export default withAuth(Messages);
