<div className="newTour">
<div className="main">
  <Formik
    initialValues={initialValues}
    validate={tourValidator}
    onSubmit={submitHandler}
  >
    {() => (
      <Form className="newTour__form">
        {/* ----------------------- tên tour ------------------------  */}
        <label>
          <p className="newTour__label">Tên tour {requiredField}</p>
          <Field component="textarea" name="name" />
          <ErrorMessage name="name" component="p" />
        </label>

        {/* ----------------------- lộ trình ------------------------  */}
        <label>
          <p className="newTour__label">Lộ trình {requiredField}</p>
          <Field component="textarea" name="journey" />
          <ErrorMessage name="journey" component="p" />
        </label>

        {/* ----------------------- mô tả ------------------------  */}
        <label>
          <p className="newTour__label">Mô tả {requiredField}</p>
          <Field component="textarea" name="description" />
          <ErrorMessage name="description" component="p" />
        </label>

        {/* ----------------------- điểm nổi bật ------------------------  */}
        <label>
          <p className="newTour__label">
            Điểm nổi bật <span>(enter xuống dòng)</span>{" "}
            <span title="Trường này là bắt buộc">
              {exclamationSVG}
            </span>
          </p>
          <Field component="textarea" name="highlights" />
          <ErrorMessage name="highlights" component="p" />
        </label>

        {/* ----------------------- ngày khởi hành ------------------------  */}
        <label>
          <p className="newTour__label">
            Ngày khởi hành <span>(dd/mm/yyyy)</span>{" "}
            <span>(enter xuống dòng)</span> {requiredField}
          </p>
          <Field component="textarea" name="departureDates" />
          <ErrorMessage name="departureDates" component="p" />
        </label>

        {/* ----------------------- thời gian ------------------------  */}
        <label>
          <p className="newTour__label">Số ngày {requiredField}</p>
          <Field type="Number" name="days" />
          <ErrorMessage name="days" component="p" />
        </label>

        <label>
          <p className="newTour__label">Số đêm {requiredField}</p>
          <Field type="Number" name="nights" />
          <ErrorMessage name="nights" component="p" />
        </label>

        {/* ----------------------- giá hiện tại ------------------------  */}
        <label>
          <p className="newTour__label">
            Giá hiện tại <span>(vnd)</span> {requiredField}
          </p>
          <Field type="number" name="currentPrice" />
          <ErrorMessage name="currentPrice" component="p" />
        </label>

        {/* ----------------------- giá cũ ------------------------  */}
        <label>
          <p className="newTour__label">
            Giá cũ <span>(vnd)</span>
          </p>
          <Field type="number" name="oldPrice" />
          <ErrorMessage name="oldPrice" component="p" />
        </label>

        {/* ----------------------- giá bao gồm / không bao gồm ------------------------  */}
        <label>
          <p className="newTour__label">
            Giá bao gồm <span>(enter xuống dòng)</span>
          </p>
          <Field component="textarea" name="priceIncludes" />
          <ErrorMessage name="priceIncludes" component="p" />
        </label>

        <label>
          <p className="newTour__label">
            Giá không bao gồm <span>(enter xuống dòng)</span>
          </p>
          <Field component="textarea" name="priceExcludes" />
          <ErrorMessage name="priceExcludes" component="p" />
        </label>

        {/* ----------------------- điều kiện hủy ------------------------  */}
        <label>
          <p className="newTour__label">
            Điều kiện hoàn hủy đổi <span>(enter xuống dòng)</span>{" "}
            {requiredField}
          </p>
          <Field component="textarea" name="cancellationPolicy" />
          <ErrorMessage name="cancellationPolicy" component="p" />
        </label>

        {/* ----------------------- hình ------------------------  */}
        <label>
          <p className="newTour__label">Ảnh slider (4 hình)</p>
          <input
            type="file"
            name="slider"
            multiple
            onChange={selectImagesHandler}
          />
          <ErrorMessage name="images" component="p" />
        </label>

        <label>
          <p className="newTour__label">Ảnh preview (1 hình)</p>
          <input
            type="file"
            name="thumb"
            onChange={selectImagesHandler}
          />
          <ErrorMessage name="images" component="p" />
        </label>

        <button type="submit">Submit</button>
      </Form>
    )}

  </Formik>
</div>
</div>
