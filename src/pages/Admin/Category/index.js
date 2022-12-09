import {
  useEffect,
  AdminLayout,
  SpinnerModal,
  EditCatModal,
  useAxios,
  adminApis,
  categoryApi,
  useRef,
  CatGroup,
  styles,
} from "./import";
import ErrorMessage from "../../../components/ErrorMessage";
import { Routes, Route, Outlet, useLocation } from "react-router-dom";
import { useState } from "react";
import CatForm from "./CatForm";
import usePageTitle from "../../../hooks/usePageTitle";
import StatusBar from "../../../layout/AdminLayout/StatusBar";

function Category() {
  const [sendRequest, isLoading, data, error] = useAxios();
  const [add, adding, added, addingError] = useAxios();
  const [goDelete, isDeleting, deleted, deletingError] = useAxios();

  const location = useLocation();
  const edited = location.state?.edited;

  const deleteHandler = (catId) => {
    goDelete(adminApis.category.delete(catId));
  };

  const submitHandler = (values) => {
    add(
      adminApis.category.add({
        type: values.type,
        code: values.code,
        name: values.name,
        parent: values.parent,
      })
    );
  };

  useEffect(() => {
    sendRequest(categoryApi.get());
  }, [deleted, added]);

  useEffect(() => {
    if (edited) {
      sendRequest(categoryApi.get());
    }
  }, [edited]);

  useEffect(() => {
    if (added) {
      alert("Thêm thành công");
    }
  }, [added]);

  useEffect(() => {
    if (addingError) {
      alert("Thêm thất bại");
    }
  }, [addingError]);

  useEffect(() => {
    if (deletingError) {
      alert("Xóa thất bại");
    }
  }, [deletingError]);

  useEffect(() => {
    if (deleted) {
      alert("Đã xóa");
    }
  }, [deleted]);

  usePageTitle("Quản lý danh mục | Admin | Travel Funix");

  return (
    <>
      <SpinnerModal show={isLoading || adding || isDeleting} />
      <AdminLayout>
        <div className={styles.container}>
          {error && <ErrorMessage msg={error.message} />}

          <StatusBar title="Quản lý danh mục" />

          {data && (
            <div className="pb-4 border-bottom">
              <h6 className="pb-2">Thêm mới category item</h6>
              {data && (
                <CatForm
                  categories={data.data}
                  initialValues={{
                    type: "",
                    code: "",
                    name: "",
                  }}
                  onSubmit={submitHandler}
                />
              )}
            </div>
          )}

          {data && (
            <CatGroup
              type="continent"
              cat={data.data}
              onDelete={deleteHandler}
            />
          )}
          {data && (
            <CatGroup
              type="language"
              cat={data.data}
              onDelete={deleteHandler}
            />
          )}

          {data && (
            <CatGroup type="country" cat={data.data} onDelete={deleteHandler} />
          )}

          {data && (
            <CatGroup type="city" cat={data.data} onDelete={deleteHandler} />
          )}

          {data && (
            <CatGroup type="article" cat={data.data} onDelete={deleteHandler} />
          )}
        </div>
      </AdminLayout>
      <Outlet />
    </>
  );
}

export default Category;
