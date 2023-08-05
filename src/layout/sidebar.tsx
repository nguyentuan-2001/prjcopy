import React, { useContext, useEffect, useState } from "react";
import '../css/component.css'
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

library.add(fas);
const Sidebar = () => {
    
  return (
    <div className="sidebar">
        <section>
            <ul className="ul_sidebar">
                <li> 
                    <div className="ul_sidebar_image">
                        <img src="../images/hoitruong.svg" alt="" />
                    </div>
                    <div>
                        <span>Hội trường</span><br />
                        <div className="ul_sidebar_icon">
                            <FontAwesomeIcon icon="caret-down" />
                        </div>
                    </div>
                </li>
                <li> 
                    <div className="ul_sidebar_image">
                        <img src="../images/chuyenkhoa.svg" alt="" />
                    </div>
                    <div>
                        <span>Chuyên khoa</span><br />
                        <div className="ul_sidebar_icon">
                            <FontAwesomeIcon icon="caret-down" />
                        </div>
                    </div>
                </li>
                <li> 
                    <div className="ul_sidebar_image">
                        <img src="../images/thuvien.svg" alt="" />
                    </div>
                    <div>
                        <span>Thư viện</span><br />
                    </div>
                </li>
                <li> 
                    <div className="ul_sidebar_image">
                        <img src="../images/tuyensinh.svg" alt="" />
                    </div>
                    <div>
                        <span>Phòng tuyển sinh</span><br />
                    </div>
                </li>
                <li> 
                    <div className="ul_sidebar_image">
                        <img src="../images/tatca.svg" alt="" />
                    </div>
                    <div>
                        <span>Tất cả</span><br />
                    </div>
                </li>
                <li> 
                    <div className="ul_sidebar_image">
                        <img src="../images/danhsach.svg" alt="" />
                    </div>
                    <div>
                        <span>Danh sách</span><br />
                    </div>
                </li>

            </ul>
        </section>
    </div>
  )
}

export default Sidebar