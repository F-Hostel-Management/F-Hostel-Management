import { Paper } from '@mui/material'
import React, { FC } from 'react'
import * as ReactDOMServer from 'react-dom/server'

interface ICommitmentDetailsProps {}

const CommitmentDetails: FC<ICommitmentDetailsProps> = () => {
    const content = (
        <div id="divToPrint">
            <div style={{ textAlign: 'center' }}>
                <span style={{ fontFamily: 'Times New Roman,Times,serif' }}>
                    <strong>
                        <span style={{ fontSize: '9.0pt' }}>
                            CỘNG H&Ograve;A X&Atilde; HỘI CHỦ NGHĨA VIỆT NAM
                        </span>
                    </strong>
                </span>
            </div>

            <div style={{ textAlign: 'center' }}>
                <span style={{ fontFamily: 'Times New Roman,Times,serif' }}>
                    <strong>
                        <span style={{ fontSize: '9.0pt' }}>
                            Độc lập - Tự do - Hạnh ph&uacute;c
                        </span>
                    </strong>
                </span>
            </div>

            <div style={{ textAlign: 'center' }}>
                <span style={{ fontFamily: 'Times New Roman,Times,serif' }}>
                    <span style={{ fontSize: '10.5pt' }}>- - - o0o - - -</span>
                </span>
            </div>

            <div style={{ textAlign: 'center' }}>&nbsp;</div>

            <div style={{ textAlign: 'center' }}>
                <span style={{ fontFamily: 'Times New Roman,Times,serif' }}>
                    <strong>
                        <span style={{ fontSize: '10.5pt' }}>HỢP ĐỒNG </span>
                    </strong>
                </span>
            </div>

            <div style={{ textAlign: 'center' }}>
                <span style={{ fontFamily: 'Times New Roman,Times,serif' }}>
                    <strong>
                        <span style={{ fontSize: '10.5pt' }}>
                            CHO THU&Ecirc; PH&Ograve;NG TRỌ{' '}
                        </span>
                    </strong>
                </span>
            </div>

            <div style={{ textAlign: 'center' }}>&nbsp;</div>

            <div>
                <span style={{ fontFamily: 'Times New Roman,Times,serif' }}>
                    <span style={{ fontSize: '10.5pt' }}>
                        -{' '}
                        <em>
                            Căn cứ Bộ luật D&acirc;n sự số 91/2015/QH13
                            ng&agrave;y 24/11/2015 v&agrave; c&aacute;c văn bản
                            hướng dẫn thi h&agrave;nh;
                        </em>
                    </span>
                </span>
            </div>

            <div>
                <span style={{ fontFamily: 'Times New Roman,Times,serif' }}>
                    <span style={{ fontSize: '10.5pt' }}>
                        -{' '}
                        <em>
                            Căn cứ Luật Nh&agrave; ở, Luật Đất đai v&agrave;
                            c&aacute;c văn bản hướng dẫn thi h&agrave;nh;
                        </em>
                    </span>
                </span>
            </div>

            <div>
                <span style={{ fontFamily: 'Times New Roman,Times,serif' }}>
                    <span style={{ fontSize: '10.5pt' }}>
                        -{' '}
                        <em>
                            Căn cứ nhu cầu thu&ecirc; ph&ograve;ng trọ của
                            &Ocirc;ng (B&agrave;);
                        </em>
                    </span>
                </span>
            </div>

            <div>
                <span style={{ fontFamily: 'Times New Roman,Times,serif' }}>
                    <span style={{ fontSize: '10.5pt' }}>
                        -{' '}
                        <em>
                            Căn cứ v&agrave;o năng lực v&agrave; nhu cầu của
                            c&aacute;c b&ecirc;n chủ thể giao kết hợp đồng.{' '}
                        </em>
                    </span>
                </span>
            </div>

            <div>&nbsp;</div>

            <div>
                <span style={{ fontFamily: 'Times New Roman,Times,serif' }}>
                    <span style={{ fontSize: '10.5pt' }}>
                        H&ocirc;m nay, ng&agrave;y &hellip;&hellip; th&aacute;ng
                        &hellip;&hellip; năm &hellip;&hellip;&hellip;., tại địa
                        chỉ
                        &hellip;&hellip;&hellip;&hellip;&hellip;&hellip;&hellip;&hellip;&hellip;&hellip;&hellip;...............................................
                    </span>
                </span>
            </div>

            <div>
                <span style={{ fontFamily: 'Times New Roman,Times,serif' }}>
                    <span style={{ fontSize: '10.5pt' }}>
                        Ch&uacute;ng t&ocirc;i gồm c&oacute;:
                    </span>
                </span>
            </div>

            <div>&nbsp;</div>

            <div>
                <span style={{ fontFamily: 'Times New Roman,Times,serif' }}>
                    <strong>
                        <span style={{ fontSize: '10.5pt' }}>
                            B&Ecirc;N CHO THU&Ecirc;:{' '}
                        </span>
                    </strong>
                </span>
            </div>

            <div>
                <span style={{ fontFamily: 'Times New Roman,Times,serif' }}>
                    <strong>
                        <span style={{ fontSize: '10.5pt' }}>
                            &Ocirc;ng (B&agrave;){' '}
                        </span>
                    </strong>
                    <span style={{ fontSize: '10.5pt' }}>
                        {}. Năm sinh: {}
                    </span>
                </span>
            </div>

            <div>
                <span style={{ fontFamily: 'Times New Roman,Times,serif' }}>
                    <span style={{ fontSize: '10.5pt' }}>
                        CMND số: {},&nbsp; Ng&agrave;y cấp:
                        &hellip;&hellip;....&hellip;&hellip;&hellip;&hellip;.
                        Nơi cấp:
                        &hellip;&hellip;&hellip;&hellip;&hellip;&hellip;..&hellip;&hellip;
                    </span>
                </span>
            </div>

            <div>
                <span style={{ fontFamily: 'Times New Roman,Times,serif' }}>
                    <span style={{ fontSize: '10.5pt' }}>Địa chỉ: {}</span>
                </span>
            </div>

            <div>
                <span style={{ fontFamily: 'Times New Roman,Times,serif' }}>
                    <span style={{ fontSize: '10.5pt' }}>Điện thoại: {}</span>
                </span>
            </div>

            <div>
                <span style={{ fontFamily: 'Times New Roman,Times,serif' }}>
                    <em>
                        <span style={{ fontSize: '10.5pt' }}>
                            (Sau đ&acirc;y được gọi tắt l&agrave; B&ecirc;n A)
                        </span>
                    </em>
                </span>
            </div>

            <div>
                <span style={{ fontFamily: 'Times New Roman,Times,serif' }}>
                    <strong>
                        <span style={{ fontSize: '10.5pt' }}>
                            B&Ecirc;N THU&Ecirc;:{' '}
                        </span>
                    </strong>
                </span>
            </div>

            <div>
                <span style={{ fontFamily: 'Times New Roman,Times,serif' }}>
                    <strong>
                        <span style={{ fontSize: '10.5pt' }}>
                            &Ocirc;ng (B&agrave;){' '}
                        </span>
                    </strong>
                    <span style={{ fontSize: '10.5pt' }}>
                        {}.&nbsp; Năm sinh: {}.
                    </span>
                </span>
            </div>

            <div>
                <span style={{ fontFamily: 'Times New Roman,Times,serif' }}>
                    <span style={{ fontSize: '10.5pt' }}>
                        CMND số: {}, Ng&agrave;y cấp: {}&nbsp;Nơi cấp: {}
                    </span>
                </span>
            </div>

            <div>
                <span style={{ fontFamily: 'Times New Roman,Times,serif' }}>
                    <span style={{ fontSize: '10.5pt' }}>Địa chỉ: {}</span>
                </span>
            </div>

            <div>
                <span style={{ fontFamily: 'Times New Roman,Times,serif' }}>
                    <span style={{ fontSize: '10.5pt' }}>Điện thoại: {}</span>
                </span>
            </div>

            <div>
                <span style={{ fontFamily: 'Times New Roman,Times,serif' }}>
                    <em>
                        <span style={{ fontSize: '10.5pt' }}>
                            (Sau đ&acirc;y được gọi tắt l&agrave; B&ecirc;n B)
                        </span>
                    </em>
                </span>
            </div>

            <div>&nbsp;</div>

            <div style={{ textAlign: 'justify' }}>
                <span style={{ fontFamily: 'Times New Roman,Times,serif' }}>
                    <strong>
                        <em>
                            <span style={{ fontSize: '10.5pt' }}>
                                Sau khi c&ugrave;ng b&agrave;n bạc v&agrave;
                                thoả thuận tr&ecirc;n tinh thần hợp t&aacute;c,
                                thiện ch&iacute; v&agrave; b&igrave;nh đẳng, Hai
                                B&ecirc;n nhất tr&iacute; k&yacute; kết Hợp đồng
                                cho thu&ecirc; ph&ograve;ng trọ (gọi tắt
                                l&agrave; Hợp đồng) với c&aacute;c điều khoản
                                sau đ&acirc;y:
                            </span>
                        </em>
                    </strong>
                </span>
            </div>

            <div style={{ textAlign: 'justify' }}>
                <span style={{ fontFamily: 'Times New Roman,Times,serif' }}>
                    <span style={{ fontSize: '9.0pt' }}>Điều I:</span>
                    <span style={{ fontSize: '9.0pt' }}>
                        {' '}
                        Đối tượng của Hợp đồng
                    </span>
                </span>
            </div>

            <div style={{ textAlign: 'justify' }}>
                <span style={{ fontFamily: 'Times New Roman,Times,serif' }}>
                    <span style={{ fontSize: '10.5pt' }}>
                        Hợp đồng n&agrave;y l&agrave; sự thoả thuận giữa
                        B&ecirc;n A v&agrave; B&ecirc;n B, theo đ&oacute;
                        B&ecirc;n A cho B&ecirc;n B thu&ecirc; ph&ograve;ng trọ
                        thuộc quyền quản l&yacute;, sử dụng hợp ph&aacute;p của
                        m&igrave;nh, c&ograve;n B&ecirc;n B trả tiền thu&ecirc;
                        cho B&ecirc;n A theo gi&aacute; trị, phương thức thỏa
                        thuận trong hợp đồng. Cụ thể như sau :
                    </span>
                </span>
            </div>

            <div style={{ textAlign: 'justify' }}>
                <span style={{ fontFamily: 'Times New Roman,Times,serif' }}>
                    <strong>
                        <span style={{ fontSize: '10.5pt' }}>
                            1. Ph&ograve;ng trọ cho thu&ecirc;
                        </span>
                    </strong>
                </span>
            </div>

            <div style={{ textAlign: 'justify' }}>
                <span style={{ fontFamily: 'Times New Roman,Times,serif' }}>
                    <span style={{ fontSize: '10.5pt' }}>
                        Ph&ograve;ng trọ cho thu&ecirc; c&oacute; c&aacute;c đặc
                        điểm như sau:
                    </span>
                </span>
            </div>

            <div style={{ textAlign: 'justify' }}>
                <span style={{ fontFamily: 'Times New Roman,Times,serif' }}>
                    <span style={{ fontSize: '10.5pt' }}>
                        Ph&ograve;ng số: {}. Tổng diện t&iacute;ch sử dụng: {}{' '}
                        m2
                    </span>
                </span>
            </div>

            <div style={{ textAlign: 'justify' }}>
                <span style={{ fontFamily: 'Times New Roman,Times,serif' }}>
                    <span style={{ fontSize: '10.5pt' }}>Địa chỉ: {}</span>
                </span>
            </div>

            <div style={{ textAlign: 'justify' }}>
                <span style={{ fontFamily: 'Times New Roman,Times,serif' }}>
                    <span style={{ fontSize: '10.5pt' }}>
                        B&ecirc;n A đảm bảo rằng ph&ograve;ng trọ n&oacute;i
                        tr&ecirc;n thuộc quyền quản l&yacute; v&agrave; sử dụng
                        hợp ph&aacute;p của m&igrave;nh, to&agrave;n bộ
                        ph&ograve;ng trọ cho thu&ecirc; kh&ocirc;ng c&oacute;
                        tranh chấp, khiếu kiện về quyền sở hữu v&agrave; quyền
                        sử dụng; Kh&ocirc;ng bị r&agrave;ng buộc dưới bất kỳ
                        h&igrave;nh thức n&agrave;o bởi c&aacute;c việc: mua,
                        b&aacute;n, trao đổi, tặng, cho, cho thu&ecirc;, cho
                        mượn, bị k&ecirc; bi&ecirc;n bởi cơ quan c&oacute; thẩm
                        quyền.
                    </span>
                </span>
            </div>

            <div style={{ textAlign: 'justify' }}>
                <span style={{ fontFamily: 'Times New Roman,Times,serif' }}>
                    <strong>
                        <span style={{ fontSize: '10.5pt' }}>
                            2. Mục đ&iacute;ch thu&ecirc; ph&ograve;ng trọ:
                        </span>
                    </strong>
                </span>
            </div>

            <div style={{ textAlign: 'justify' }}>
                <span style={{ fontFamily: 'Times New Roman,Times,serif' }}>
                    <span style={{ fontSize: '10.5pt' }}>
                        B&ecirc;n B thu&ecirc;, đưa v&agrave;o sử dụng
                        ph&ograve;ng trọ tại địa chỉ: {} để ở theo nhu cầu của
                        B&ecirc;n B v&agrave; theo đ&uacute;ng quy định của
                        ph&aacute;p luật.
                    </span>
                </span>
            </div>

            <div style={{ textAlign: 'justify' }}>
                <span style={{ fontFamily: 'Times New Roman,Times,serif' }}>
                    <span style={{ fontSize: '9.0pt' }}>Điều II:</span>
                    <span style={{ fontSize: '9.0pt' }}>
                        {' '}
                        Thời hạn cho thu&ecirc;, gi&aacute; cho thu&ecirc;
                        v&agrave; điều kiện thanh to&aacute;n
                    </span>
                </span>
            </div>

            <div style={{ textAlign: 'justify' }}>
                <span style={{ fontFamily: 'Times New Roman,Times,serif' }}>
                    <strong>
                        <span style={{ fontSize: '10.5pt' }}>
                            1. Thời hạn cho thu&ecirc;:
                        </span>
                    </strong>
                </span>
            </div>

            <div style={{ textAlign: 'justify' }}>
                <span style={{ fontFamily: 'Times New Roman,Times,serif' }}>
                    <span style={{ fontSize: '10.5pt' }}>
                        Từ ng&agrave;y {} th&aacute;ng {} năm {}&nbsp;đến hết
                        ng&agrave;y {}
                        &nbsp;th&aacute;ng {}&nbsp;năm {}
                    </span>
                </span>
            </div>

            <div style={{ textAlign: 'justify' }}>
                <span style={{ fontFamily: 'Times New Roman,Times,serif' }}>
                    <strong>
                        <span style={{ fontSize: '10.5pt' }}>
                            2. Gi&aacute; cho thu&ecirc;:{' '}
                        </span>
                    </strong>
                    <span style={{ fontSize: '10.5pt' }}>
                        {}&nbsp;<strong>đồng</strong>/
                        <strong>01/th&aacute;ng.</strong>
                    </span>
                </span>
            </div>

            <div style={{ textAlign: 'justify' }}>
                <span style={{ fontFamily: 'Times New Roman,Times,serif' }}>
                    <span style={{ fontSize: '10.5pt' }}>(Bằng chữ: {})</span>
                </span>
            </div>

            <div style={{ textAlign: 'justify' }}>
                <span style={{ fontFamily: 'Times New Roman,Times,serif' }}>
                    <em>
                        <span style={{ fontSize: '10.5pt' }}>
                            (Gi&aacute; tr&ecirc;n chưa bao gồm c&aacute;c chi
                            ph&iacute;: điện, nước sinh hoạt, vệ sinh m&ocirc;i
                            trường &hellip; thuộc tr&aacute;ch nhiệm của
                            b&ecirc;n thu&ecirc; ph&ograve;ng trọ).
                        </span>
                    </em>
                </span>
            </div>

            <div style={{ textAlign: 'justify' }}>
                <span style={{ fontFamily: 'Times New Roman,Times,serif' }}>
                    <strong>
                        <span style={{ fontSize: '10.5pt' }}>
                            3. Điều kiện thanh to&aacute;n:
                        </span>
                    </strong>
                </span>
            </div>

            <div style={{ textAlign: 'justify' }}>
                <span style={{ fontFamily: 'Times New Roman,Times,serif' }}>
                    <em>
                        <span style={{ fontSize: '10.5pt' }}>
                            - Đồng tiền thanh to&aacute;n:
                        </span>
                    </em>
                    <span style={{ fontSize: '10.5pt' }}> tiền VNĐ</span>
                </span>
            </div>

            <div style={{ textAlign: 'justify' }}>
                <span style={{ fontFamily: 'Times New Roman,Times,serif' }}>
                    <em>
                        <span style={{ fontSize: '10.5pt' }}>
                            - Phương thức thanh to&aacute;n:
                        </span>
                    </em>
                    <span style={{ fontSize: '10.5pt' }}>
                        {' '}
                        chuyển khoản hoặc tiền mặt.
                    </span>
                </span>
            </div>

            <div style={{ textAlign: 'justify' }}>
                <span style={{ fontFamily: 'Times New Roman,Times,serif' }}>
                    <em>
                        <span style={{ fontSize: '10.5pt' }}>
                            - Kỳ thanh to&aacute;n:
                        </span>
                    </em>
                    <span style={{ fontSize: '10.5pt' }}>
                        {' '}
                        trả {} th&aacute;ng/lần, lần đầu trả ngay sau khi
                        k&yacute; Hợp đồng. Nộp tiền thanh to&aacute;n sử dụng
                        ph&ograve;ng của th&aacute;ng sau v&agrave;o thời điểm
                        kh&ocirc;ng qu&aacute; ng&agrave;y &hellip;. của
                        th&aacute;ng trước liền kề.
                    </span>
                </span>
            </div>

            <div style={{ textAlign: 'justify' }}>&nbsp;</div>

            <div style={{ textAlign: 'justify' }}>
                <span style={{ fontFamily: 'Times New Roman,Times,serif' }}>
                    <span style={{ fontSize: '9.0pt' }}>Điều III:</span>
                    <span style={{ fontSize: '9.0pt' }}>
                        {' '}
                        Quyền v&agrave; nghĩa vụ của B&ecirc;n A
                    </span>
                </span>
            </div>

            <div style={{ textAlign: 'justify' }}>
                <span style={{ fontFamily: 'Times New Roman,Times,serif' }}>
                    <strong>
                        <span style={{ fontSize: '9.0pt' }}>
                            1. B&ecirc;n A c&oacute; c&aacute;c quyền sau
                            đ&acirc;y:
                        </span>
                    </strong>
                </span>
            </div>

            <div style={{ textAlign: 'justify' }}>
                <span style={{ fontFamily: 'Times New Roman,Times,serif' }}>
                    <span style={{ fontSize: '10.5pt' }}>
                        - Nhận tiền cho thu&ecirc; ph&ograve;ng trọ theo
                        đ&uacute;ng kỳ hạn đ&atilde; thỏa thuận với B&ecirc;n B;
                    </span>
                </span>
            </div>

            <div style={{ textAlign: 'justify' }}>
                <span style={{ fontFamily: 'Times New Roman,Times,serif' }}>
                    <span style={{ fontSize: '10.5pt' }}>
                        - C&ugrave;ng B&ecirc;n B thỏa thuận sửa đổi, bổ sung
                        c&aacute;c điều khoản trong Hợp đồng hoặc lập Phụ lục
                        Hợp đồng cho ph&ugrave; hợp với điều kiện của thực tế
                        v&agrave; nhu cầu của C&aacute;c B&ecirc;n. Việc thỏa
                        thuận sửa đổi, bổ sung c&aacute;c điều khoản trong Hợp
                        đồng hoặc lập Phụ lục Hợp đồng phải được lập
                        th&agrave;nh văn bản c&oacute; chữ k&yacute; x&aacute;c
                        nhận hợp lệ của Hai B&ecirc;n mới c&oacute; gi&aacute;
                        trị thực hiện;
                    </span>
                </span>
            </div>

            <div style={{ textAlign: 'justify' }}>
                <span style={{ fontFamily: 'Times New Roman,Times,serif' }}>
                    <span style={{ fontSize: '10.5pt' }}>
                        - Được nhận lại ph&ograve;ng trọ cho thu&ecirc; khi hết
                        hạn Hợp đồng;
                    </span>
                </span>
            </div>

            <div style={{ textAlign: 'justify' }}>
                <span style={{ fontFamily: 'Times New Roman,Times,serif' }}>
                    <span style={{ fontSize: '10.5pt' }}>
                        - Đơn phương chấm dứt Hợp đồng với B&ecirc;n B, di
                        chuyển t&agrave;i sản của B&ecirc;n B ra ngo&agrave;i
                        v&agrave; kh&oacute;a cửa ph&ograve;ng trọ, kh&ocirc;ng
                        ho&agrave;n lại tiền cho thu&ecirc; ph&ograve;ng trọ
                        đ&atilde; nhận, phạt vi phạm Hợp đồng v&agrave;
                        y&ecirc;u cầu bồi thường thiệt hại khi B&ecirc;n B
                        c&oacute; một trong c&aacute;c h&agrave;nh vi sau
                        đ&acirc;y:
                    </span>
                </span>
            </div>

            <div style={{ textAlign: 'justify' }}>
                <span style={{ fontFamily: 'Times New Roman,Times,serif' }}>
                    <em>
                        <span style={{ fontSize: '10.5pt' }}>
                            + Kh&ocirc;ng thanh to&aacute;n đủ tiền thu&ecirc;
                            ph&ograve;ng trọ cho B&ecirc;n A đ&uacute;ng thời
                            hạn;
                        </span>
                    </em>
                </span>
            </div>

            <div style={{ textAlign: 'justify' }}>
                <span style={{ fontFamily: 'Times New Roman,Times,serif' }}>
                    <em>
                        <span style={{ fontSize: '10.5pt' }}>
                            + Kh&ocirc;ng sửa chữa hoặc thay thế thiết bị của
                            B&ecirc;n A bị hư hỏng trong qu&aacute; tr&igrave;nh
                            sử dụng;
                        </span>
                    </em>
                </span>
            </div>

            <div style={{ textAlign: 'justify' }}>
                <span style={{ fontFamily: 'Times New Roman,Times,serif' }}>
                    <em>
                        <span style={{ fontSize: '10.5pt' }}>
                            + Sử dụng ph&ograve;ng trọ kh&ocirc;ng đ&uacute;ng
                            mục đ&iacute;ch đ&atilde; thu&ecirc; tại Điều I của
                            Hợp đồng;
                        </span>
                    </em>
                </span>
            </div>

            <div style={{ textAlign: 'justify' }}>
                <span style={{ fontFamily: 'Times New Roman,Times,serif' }}>
                    <em>
                        <span style={{ fontSize: '10.5pt' }}>
                            + Vi phạm ph&aacute;p luật, g&acirc;y mất an ninh
                            trật tự c&ocirc;ng cộng, g&acirc;y ch&aacute;y, nổ,
                            l&agrave;m mất vệ sinh m&ocirc;i trường v&agrave;
                            ảnh hưởng nghi&ecirc;m trọng đến hoạt động
                            b&igrave;nh thường của khu vực xung quanh;
                        </span>
                    </em>
                </span>
            </div>

            <div style={{ textAlign: 'justify' }}>
                <span style={{ fontFamily: 'Times New Roman,Times,serif' }}>
                    <strong>
                        <span style={{ fontSize: '10.5pt' }}>
                            2. B&ecirc;n A c&oacute; c&aacute;c nghĩa vụ sau
                            đ&acirc;y:
                        </span>
                    </strong>
                </span>
            </div>

            <div style={{ textAlign: 'justify' }}>
                <span style={{ fontFamily: 'Times New Roman,Times,serif' }}>
                    <span style={{ fontSize: '10.5pt' }}>
                        - B&agrave;n giao ph&ograve;ng trọ cho B&ecirc;n B
                        đ&uacute;ng thời gian đ&atilde; thoả thuận;
                    </span>
                </span>
            </div>

            <div style={{ textAlign: 'justify' }}>
                <span style={{ fontFamily: 'Times New Roman,Times,serif' }}>
                    <span style={{ fontSize: '10.5pt' }}>
                        - Cấp nguồn điện, nước ri&ecirc;ng c&oacute; c&ocirc;ng
                        tơ đo đếm cho B&ecirc;n B sử dụng;
                    </span>
                </span>
            </div>

            <div style={{ textAlign: 'justify' }}>
                <span style={{ fontFamily: 'Times New Roman,Times,serif' }}>
                    <span style={{ fontSize: '10.5pt' }}>
                        - Tạo điều kiện đảm bảo cho B&ecirc;n B sử dụng
                        ph&ograve;ng trọ đ&atilde; thu&ecirc; ổn định, trọn vẹn,
                        độc lập trong thời hạn B&ecirc;n B thu&ecirc;;
                    </span>
                </span>
            </div>

            <div style={{ textAlign: 'justify' }}>
                <span style={{ fontFamily: 'Times New Roman,Times,serif' }}>
                    <span style={{ fontSize: '9.0pt' }}>Điều IV:</span>
                    <span style={{ fontSize: '9.0pt' }}>
                        {' '}
                        Quyền v&agrave; nghĩa vụ của B&ecirc;n B
                    </span>
                </span>
            </div>

            <div style={{ textAlign: 'justify' }}>
                <span style={{ fontFamily: 'Times New Roman,Times,serif' }}>
                    <strong>
                        <span style={{ fontSize: '10.5pt' }}>
                            1. B&ecirc;n B c&oacute; c&aacute;c quyền sau
                            đ&acirc;y:
                        </span>
                    </strong>
                </span>
            </div>

            <div style={{ textAlign: 'justify' }}>
                <span style={{ fontFamily: 'Times New Roman,Times,serif' }}>
                    <span style={{ fontSize: '10.5pt' }}>
                        - Nhận b&agrave;n giao ph&ograve;ng trọ thu&ecirc; theo
                        đ&uacute;ng thỏa thuận với B&ecirc;n A;
                    </span>
                </span>
            </div>

            <div style={{ textAlign: 'justify' }}>
                <span style={{ fontFamily: 'Times New Roman,Times,serif' }}>
                    <span style={{ fontSize: '10.5pt' }}>
                        - Được bố tr&iacute;, lắp đặt th&ecirc;m c&aacute;c
                        trang, thiết bị ph&ugrave; hợp với nhu cầu sử dụng tại
                        ph&ograve;ng trọ nhưng kh&ocirc;ng ảnh hưởng đến độ an
                        to&agrave;n của kết cấu, kiến tr&uacute;c, thiết kế
                        chung của ph&ograve;ng. Chi ph&iacute; mua sắm v&agrave;
                        lắp đặt c&aacute;c trang thiết bị tr&ecirc;n B&ecirc;n B
                        tự đầu tư v&agrave; phải tự th&aacute;o dỡ trả lại
                        nguy&ecirc;n trạng ph&ograve;ng ban đầu cho B&ecirc;n A
                        khi trả ph&ograve;ng.
                    </span>
                </span>
            </div>

            <div style={{ textAlign: 'justify' }}>
                <span style={{ fontFamily: 'Times New Roman,Times,serif' }}>
                    <span style={{ fontSize: '10.5pt' }}>
                        - C&ugrave;ng B&ecirc;n B thỏa thuận sửa đổi, bổ sung
                        c&aacute;c điều khoản trong Hợp đồng hoặc lập Phụ lục
                        Hợp đồng cho ph&ugrave; hợp với điều kiện của thực tế
                        v&agrave; nhu cầu của C&aacute;c B&ecirc;n. Việc thỏa
                        thuận sửa đổi, bổ sung c&aacute;c điều khoản trong Hợp
                        đồng hoặc lập Phụ lục Hợp đồng phải được lập
                        th&agrave;nh văn bản c&oacute; chữ k&yacute; x&aacute;c
                        nhận hợp lệ của C&aacute;c B&ecirc;n mới c&oacute;
                        gi&aacute; trị thực hiện;
                    </span>
                </span>
            </div>

            <div style={{ textAlign: 'justify' }}>
                <span style={{ fontFamily: 'Times New Roman,Times,serif' }}>
                    <strong>
                        <span style={{ fontSize: '10.5pt' }}>
                            2. B&ecirc;n B c&oacute; c&aacute;c nghĩa vụ sau
                            đ&acirc;y:
                        </span>
                    </strong>
                </span>
            </div>

            <div style={{ textAlign: 'justify' }}>
                <span style={{ fontFamily: 'Times New Roman,Times,serif' }}>
                    <span style={{ fontSize: '10.5pt' }}>
                        - Sử dụng ph&ograve;ng trọ theo đ&uacute;ng mục
                        đ&iacute;ch để ở đ&atilde; thỏa thuận với B&ecirc;n A
                        tại Hợp đồng;
                    </span>
                </span>
            </div>

            <div style={{ textAlign: 'justify' }}>
                <span style={{ fontFamily: 'Times New Roman,Times,serif' }}>
                    <span style={{ fontSize: '10.5pt' }}>
                        - Trả đủ v&agrave; đ&uacute;ng kỳ hạn tiền thu&ecirc;
                        ph&ograve;ng trọ như đ&atilde; thỏa thuận với B&ecirc;n
                        A ;
                    </span>
                </span>
            </div>

            <div style={{ textAlign: 'justify' }}>
                <span style={{ fontFamily: 'Times New Roman,Times,serif' }}>
                    <span style={{ fontSize: '10.5pt' }}>
                        - Trả tiền điện, nước, vệ sinh v&agrave; c&aacute;c chi
                        ph&iacute; ph&aacute;t sinh kh&aacute;c (nếu c&oacute;)
                        trong thời gian thu&ecirc; ph&ograve;ng căn cứ theo chỉ
                        số thực tế sử dụng;
                    </span>
                </span>
            </div>

            <div style={{ textAlign: 'justify' }}>
                <span style={{ fontFamily: 'Times New Roman,Times,serif' }}>
                    <span style={{ fontSize: '10.5pt' }}>
                        - Bảo quản v&agrave; giữ g&igrave;n cho B&ecirc;n A
                        c&aacute;c t&agrave;i sản, trang thiết bị trong
                        ph&ograve;ng trọ B&ecirc;n A đ&atilde; b&agrave;n giao,
                        nếu hư hỏng B&ecirc;n B phải sửa chữa hoặc thay thế (trừ
                        trường hợp hư hỏng do hao m&ograve;n tự nhi&ecirc;n);
                    </span>
                </span>
            </div>

            <div style={{ textAlign: 'justify' }}>
                <span style={{ fontFamily: 'Times New Roman,Times,serif' }}>
                    <span style={{ fontSize: '10.5pt' }}>
                        - Chấp h&agrave;nh c&aacute;c quy định của Nh&agrave;
                        nước, ch&iacute;nh quyền địa phương v&agrave; tự chịu
                        tr&aacute;ch nhiệm về bảo vệ an ninh trật tự, vệ sinh,
                        an to&agrave;n về người v&agrave; t&agrave;i sản của
                        m&igrave;nh, tự khai b&aacute;o đăng k&yacute; tạm
                        tr&uacute;, tạm vắng theo quy định của ph&aacute;p luật;
                    </span>
                </span>
            </div>

            <div style={{ textAlign: 'justify' }}>
                <span style={{ fontFamily: 'Times New Roman,Times,serif' }}>
                    <span style={{ fontSize: '10.5pt' }}>
                        - Bồi thường thiệt hại cho B&ecirc;n A nếu để xảy ra
                        ch&aacute;y, nổ hoặc g&acirc;y hư hỏng đối với
                        t&agrave;i sản của B&ecirc;n A;
                    </span>
                </span>
            </div>

            <div style={{ textAlign: 'justify' }}>
                <span style={{ fontFamily: 'Times New Roman,Times,serif' }}>
                    <span style={{ fontSize: '10.5pt' }}>
                        - B&agrave;n giao lại ph&ograve;ng trọ cho B&ecirc;n A
                        khi hết hạn hợp đồng thu&ecirc; ph&ograve;ng trọ.
                    </span>
                </span>
            </div>

            <div style={{ textAlign: 'justify' }}>
                <span style={{ fontFamily: 'Times New Roman,Times,serif' }}>
                    <span style={{ fontSize: '10.5pt' }}>
                        - Khi B&ecirc;n B đơn phương chấm dứt thực hiện Hợp đồng
                        kh&ocirc;ng đ&uacute;ng quy định của ph&aacute;p luật
                        hoặc kh&ocirc;ng đ&uacute;ng thỏa thuận trong Hợp đồng
                        n&agrave;y, B&ecirc;n B phải c&oacute; nghĩa vụ nộp phạt
                        vi phạm cho B&ecirc;n A số tiền l&agrave;{' '}
                        <strong>
                            &hellip;&hellip;&hellip;&hellip;&hellip;&hellip;&hellip;..
                            đồng
                        </strong>{' '}
                        <em>
                            (&hellip;&hellip;&hellip;&hellip;&hellip;&hellip;&hellip;..
                            đồng Việt Nam).
                        </em>
                    </span>
                </span>
            </div>

            <div style={{ textAlign: 'justify' }}>
                <span style={{ fontFamily: 'Times New Roman,Times,serif' }}>
                    <strong>
                        <span style={{ fontSize: '10.5pt' }}>Điều V:</span>
                    </strong>
                    <strong>
                        <span style={{ fontSize: '10.5pt' }}>
                            {' '}
                            Điều khoản chung
                        </span>
                    </strong>
                </span>
            </div>

            <div style={{ textAlign: 'justify' }}>
                <span style={{ fontFamily: 'Times New Roman,Times,serif' }}>
                    <span style={{ fontSize: '10.5pt' }}>
                        1. Hai B&ecirc;n cam kết thực hiện đ&uacute;ng v&agrave;
                        đầy đủ c&aacute;c điều khoản đ&atilde; ghi trong bản Hợp
                        đồng, nếu B&ecirc;n n&agrave;o vi phạm phải chịu phạt vi
                        phạm v&agrave; phải bồi thường thiệt hại cho B&ecirc;n
                        kia hoặc B&ecirc;n thứ ba <em>(nếu c&oacute;)</em>tương
                        ứng với mức độ lỗi vi phạm v&agrave; thiệt hại thực tế
                        xảy ra.
                    </span>
                </span>
            </div>

            <div style={{ textAlign: 'justify' }}>
                <span style={{ fontFamily: 'Times New Roman,Times,serif' }}>
                    <span style={{ fontSize: '10.5pt' }}>
                        2. Trong qu&aacute; tr&igrave;nh thực hiện Hợp đồng nếu
                        ph&aacute;t sinh tranh chấp, Hai B&ecirc;n sẽ
                        c&ugrave;ng nhau thương lượng v&agrave; h&ograve;a giải
                        tr&ecirc;n tinh thần thiện ch&iacute;, hợp t&aacute;c,
                        t&ocirc;n trọng lẫn nhau. Trong trường hợp kh&ocirc;ng
                        thương lượng được, tranh chấp sẽ được giải quyết bằng
                        con đường T&ograve;a &aacute;n theo quy định của hệ
                        thống ph&aacute;p luật Việt Nam.
                    </span>
                </span>
            </div>

            <div style={{ textAlign: 'justify' }}>
                <span style={{ fontFamily: 'Times New Roman,Times,serif' }}>
                    <span style={{ fontSize: '10.5pt' }}>
                        3. Hợp đồng c&oacute; hiệu lực kể từ ng&agrave;y
                        k&yacute; v&agrave; chấm dứt hiệu lực trong c&aacute;c
                        trường hợp sau đ&acirc;y:
                    </span>
                </span>
            </div>

            <div style={{ textAlign: 'justify' }}>
                <span style={{ fontFamily: 'Times New Roman,Times,serif' }}>
                    <span style={{ fontSize: '10.5pt' }}>
                        -{' '}
                        <em>
                            Hết thời hạn cho thu&ecirc; ph&ograve;ng trọ quy
                            định tại khoản 1 Điều II của Hợp đồng;
                        </em>
                    </span>
                </span>
            </div>

            <div style={{ textAlign: 'justify' }}>
                <span style={{ fontFamily: 'Times New Roman,Times,serif' }}>
                    <em>
                        <span style={{ fontSize: '10.5pt' }}>
                            - Hai B&ecirc;n thỏa thuận chấm dứt Hợp đồng;
                        </span>
                    </em>
                </span>
            </div>

            <div style={{ textAlign: 'justify' }}>
                <span style={{ fontFamily: 'Times New Roman,Times,serif' }}>
                    <em>
                        <span style={{ fontSize: '10.5pt' }}>
                            - Một trong Hai B&ecirc;n đơn phương chấm dứt Hợp
                            đồng trước thời hạn đ&uacute;ng quy định;
                        </span>
                    </em>
                </span>
            </div>

            <div style={{ textAlign: 'justify' }}>
                <span style={{ fontFamily: 'Times New Roman,Times,serif' }}>
                    <em>
                        <span style={{ fontSize: '10.5pt' }}>
                            - C&aacute;c trường hợp chấm dứt Hợp đồng
                            kh&aacute;c theo quy định của ph&aacute;p luật.
                        </span>
                    </em>
                </span>
            </div>

            <div style={{ textAlign: 'justify' }}>
                <span style={{ fontFamily: 'Times New Roman,Times,serif' }}>
                    <span style={{ fontSize: '10.5pt' }}>
                        4. Hợp đồng cho thu&ecirc; ph&ograve;ng trọ n&agrave;y
                        c&oacute; hiệu lực kể từ ng&agrave;y k&yacute;. Hợp đồng
                        gồm .........&nbsp;trang, 05 Điều khoản được lập
                        th&agrave;nh ......... bản Tiếng Việt c&oacute;
                        gi&aacute; trị ph&aacute;p l&yacute; như nhau, mỗi
                        b&ecirc;n giữ ........... bản để thực hiện.
                    </span>
                </span>
            </div>

            <div>&nbsp;</div>

            <table style={{ width: '525.0pt' }}>
                <tbody>
                    <tr>
                        <td>
                            <div style={{ textAlign: 'center' }}>
                                <span
                                    style={{
                                        fontFamily:
                                            'Times New Roman,Times,serif',
                                    }}
                                >
                                    <strong>
                                        <span style={{ fontSize: '10.5pt' }}>
                                            B&Ecirc;N A
                                        </span>
                                    </strong>
                                </span>
                            </div>

                            <div style={{ textAlign: 'center' }}>
                                <span
                                    style={{
                                        fontFamily:
                                            'Times New Roman,Times,serif',
                                    }}
                                >
                                    <em>
                                        <span style={{ fontSize: '10.5pt' }}>
                                            (K&yacute;, ghi r&otilde; họ
                                            v&agrave; t&ecirc;n)
                                        </span>
                                    </em>
                                </span>
                            </div>

                            <div style={{ textAlign: 'center' }}>{}</div>
                        </td>
                        <td>
                            <div style={{ textAlign: 'center' }}>
                                <span
                                    style={{
                                        fontFamily:
                                            'Times New Roman,Times,serif',
                                    }}
                                >
                                    <strong>
                                        <span style={{ fontSize: '10.5pt' }}>
                                            B&Ecirc;N B
                                        </span>
                                    </strong>
                                </span>
                            </div>

                            <div style={{ textAlign: 'center' }}>
                                <span
                                    style={{
                                        fontFamily:
                                            'Times New Roman,Times,serif',
                                    }}
                                >
                                    <em>
                                        <span style={{ fontSize: '10.5pt' }}>
                                            (K&yacute;, ghi r&otilde; họ
                                            v&agrave; t&ecirc;n)
                                        </span>
                                    </em>
                                </span>
                            </div>

                            <div style={{ textAlign: 'center' }}>{}</div>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div style={{ textAlign: 'center' }}>&nbsp;</div>
            <div>&nbsp;</div>
        </div>
    )
    const html = ReactDOMServer.renderToStaticMarkup(content)
    console.log('HTML: ', html)
    return (
        <Paper elevation={3} sx={{ padding: '16px 32px' }}>
            {content}
        </Paper>
    )
}

export default CommitmentDetails
