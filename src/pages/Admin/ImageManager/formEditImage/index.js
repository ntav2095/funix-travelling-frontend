import { FastField, FieldArray, Form, Formik, insert } from "formik";
import { forEach } from "lodash";
import React, { useEffect } from "react";
import * as yup from "yup";
import { brokenImage } from "../../../../assets/images";
import { imagesApis } from "../../../../services/apis/admin.apis";
import { NotifyModal, useAxios } from "../import";
import CardAddImage from "./CardAddimage";
import CardImage from "./cardImage";
import styles from "./formImage.module.css";

function FormEditImage({ data, handleSusses }, ref) {
  const [goEdit, editing, isSuccess, editingError, reset] = useAxios();

  const images = data
    ? data.itinerary.map((item, index) => {
        return { [`ngày ${index + 1}`]: item.images };
      })
    : [];

  const initialValues = {
    thumb: data.thumb,
    banner: data.banner,
  };

  images.forEach((item, index) => {
    initialValues[`ngày ${index + 1}`] = item[`ngày ${index + 1}`];
  });

  const handleSumit = (e) => {
    const formdata = new FormData();
    formdata.append("tourId", data._id);
    formdata.append("thumb", e.thumb);
    formdata.append("banner", e.banner);

    data.itinerary.forEach((item, index) => {
      const dayindexfile = e[`ngày ${index + 1}`]?.filter(
        (item) => typeof item !== "string"
      );
      const dayindexurl = e[`ngày ${index + 1}`]?.filter(
        (item) => typeof item === "string"
      );

      if (dayindexurl && dayindexurl.length > 0) {
        formdata.append(`plan${index}`, JSON.stringify(dayindexurl));
      } else {
        formdata.append(`plan${index}`, JSON.stringify([]));
      }
      if (dayindexfile && dayindexfile.length > 0) {
        dayindexfile.forEach((item) => {
          formdata.append(`plan${index}`, item);
        });
      }
    });

    goEdit(imagesApis.update(formdata));
  };

  useEffect(() => {
    console.log("isSuccess", isSuccess);
  }, [isSuccess]);

  useEffect(() => {
    console.log("lỗi", editingError);
  }, [editingError]);

  let notify = {};
  if (isSuccess) {
    notify = {
      type: "success",
      message: "Cập nhật ảnh thành công",
      btn: {
        text: "OK",
        cb: () => {
          reset();
          handleSusses();
        },
        component: "button",
      },
      onHide: () => {
        reset();
      },
      time: 2000,
      show: isSuccess,
    };
  }

  if (editingError) {
    notify = {
      type: "error",
      message: editingError.message,
      btn: {
        text: "OK",
        cb: () => {
          reset();
        },
        component: "button",
      },
      onHide: () => {
        reset();
      },
      show: editingError,
    };
  }

  return (
    <>
      <NotifyModal {...notify} />

      <div className={styles.name}>{data.name}</div>

      <Formik initialValues={initialValues} onSubmit={(e) => handleSumit(e)}>
        {(formikProps) => {
          const { values, setFieldValue } = formikProps;
          console.log("values", values);
          return (
            <Form>
              <div className={styles.currentImages}>
                <h3>Hình đại diện</h3>
                <div className={styles.preview}>
                  {values.thumb ? (
                    <CardImage
                      src={values.thumb}
                      close={false}
                      arr={false}
                      handleChange={setFieldValue}
                      name={"thumb"}
                    />
                  ) : (
                    <CardAddImage
                      callback={setFieldValue}
                      arr={false}
                      name={"thumb"}
                    />
                  )}
                </div>
              </div>
              <div className={styles.currentImages}>
                <h3>Hình banner</h3>
                <div className={styles.preview}>
                  {values.banner ? (
                    <CardImage src={values.banner} close={false} arr={false} />
                  ) : (
                    <CardAddImage
                      callback={setFieldValue}
                      arr={false}
                      name={"banner"}
                    />
                  )}
                </div>
              </div>

              <div>
                {images.map((item, index) => {
                  return (
                    <div
                      id={index}
                      key={index + 100}
                      style={{ padding: "20px" }}
                    >
                      <FieldArray name={`ngày ${index + 1}`}>
                        {({ insert, remove, push }) => (
                          <>
                            <h3>{"Ảnh lộ trình ngày " + `${index + 1}`}</h3>
                            <div className={styles.container__itinerary}>
                              {values[`ngày ${index + 1}`].map(
                                (item, index1) => {
                                  return (
                                    <CardImage
                                      src={item}
                                      index={index1}
                                      handleClose={remove}
                                      close={true}
                                      handleChange={insert}
                                      arr={true}
                                    />
                                  );
                                }
                              )}
                              <CardAddImage
                                callback={insert}
                                index={values[`ngày ${index + 1}`].length}
                                arr={true}
                              />
                            </div>
                          </>
                        )}
                      </FieldArray>
                    </div>
                  );
                })}
              </div>
              <button type="submit" hidden ref={ref}></button>
            </Form>
          );
        }}
      </Formik>
    </>
  );
}
export default React.forwardRef(FormEditImage);
