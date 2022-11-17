import React from 'react'
import styles from './hearder.module.css'
import {hearder} from '../../../assets/images/index'
import {home1} from '../../../assets/images/index'
import {home2} from '../../../assets/images/index'
import {home4} from '../../../assets/images/index'
function HomeHearder(){
return(
  <div className={styles.hearder}>
    <div className={styles.image}>
        <img src={hearder}    />
    </div>
    <div className={styles.container}>
        <div className={styles.about}>
            <div className='col-12 col-md-4 col-lg-4'>
                <img src={home1}  />
                <h6>Dịch vụ đẳng cấp</h6>
                <p>Chúng tôi cam kết đem lại cho quý khách những dịch vụ uy tín nhất về lữ hành, khách sạn và nghỉ dưỡng, đảm bảo các tiêu chuẩn quốc tế về an toàn trong toàn bộ hành trình.</p>
            </div>
            <div className='col-12 col-md-4 col-lg-4'>
                <img src={home2} />
                <h6>Hành trình ấn tượng.</h6>
                <p>Không chỉ là khám phá những địa danh nổi tiếng hay tháng cảnh độc đáo, hành trình cùng 3OYA còn đem tới những trải nghiệm đáng nhớ về phong tục, văn hóa, ẩm thực và nhiều câu chuyện lịch sử thủ vị xoay quanh các điểm đến.</p>
            </div>
            <div className='col-12 col-md-4 col-lg-4'>
                <img src={home4} />
                <h6>Đối tác tin cậy</h6>
                <p>Với đội ngũ nhân viên chuyên nghiệp và chu đáo, JOYA luôn sẵn sàng hỗ trợ quý khách trong mọi trường hợp và tận tình chăm sóc khách hàng xuyên suốt các hành trình.</p>
            </div>
        </div>
    </div>
  </div>
)
}
export default HomeHearder