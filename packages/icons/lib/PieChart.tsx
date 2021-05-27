/**
The MIT License (MIT)
*/

import { Props, createIcon } from '../Icon'
import React from 'react'

export default React.forwardRef((props: Props, ref: React.RefObject<HTMLSpanElement>) => (
    createIcon(props, ref, {
        filled: <g><g id="PieChartIcon/Fill/pie-chart"><path id="PieChartMask" fillRule="evenodd" clipRule="evenodd" d="M20.2735 8.6666C19.9075 6.1156 17.8845 4.0926 15.3335 3.7266V8.6666H20.2735ZM21.1665 10.3326H14.5005C14.0405 10.3326 13.6665 9.9606 13.6665 9.4996V2.8326C13.6665 2.3726 14.0405 1.9996 14.5005 1.9996C18.6355 1.9996 22.0005 5.3646 22.0005 9.4996C22.0005 9.9606 21.6265 10.3326 21.1665 10.3326ZM12.9345 11.9776H21.0835C21.6255 11.9776 22.0495 12.4496 21.9955 12.9886C21.4515 18.4146 16.5795 22.5666 10.8815 21.9366C6.29651 21.4306 2.56951 17.7036 2.06251 13.1186C1.43451 7.4206 5.58451 2.5476 11.0115 2.0046C11.5515 1.9506 12.0225 2.3736 12.0225 2.9156V11.0666C12.0225 11.5696 12.4305 11.9776 12.9345 11.9776Z"/><mask id="PieChartmask0" mask-type="alpha" maskUnits="userSpaceOnUse" x="1" y="1" width="22" height="21"><path id="PieChartMask_2" fillRule="evenodd" clipRule="evenodd" d="M20.2735 8.6666C19.9075 6.1156 17.8845 4.0926 15.3335 3.7266V8.6666H20.2735ZM21.1665 10.3326H14.5005C14.0405 10.3326 13.6665 9.9606 13.6665 9.4996V2.8326C13.6665 2.3726 14.0405 1.9996 14.5005 1.9996C18.6355 1.9996 22.0005 5.3646 22.0005 9.4996C22.0005 9.9606 21.6265 10.3326 21.1665 10.3326ZM12.9345 11.9776H21.0835C21.6255 11.9776 22.0495 12.4496 21.9955 12.9886C21.4515 18.4146 16.5795 22.5666 10.8815 21.9366C6.29651 21.4306 2.56951 17.7036 2.06251 13.1186C1.43451 7.4206 5.58451 2.5476 11.0115 2.0046C11.5515 1.9506 12.0225 2.3736 12.0225 2.9156V11.0666C12.0225 11.5696 12.4305 11.9776 12.9345 11.9776Z"/></mask><g mask="url(#PieChartmask0)"><g id="PieChart&#PieChart240;&#PieChart159;&#PieChart142;&#PieChart168; Color"><rect id="PieChartBase" width="24" height="24"/></g></g></g></g>,
        outline: <g><g id="PieChart-oIcon/Outline/pie-chart"><path id="PieChart-oMask" fillRule="evenodd" clipRule="evenodd" d="M20.8213 14.0576C20.2983 13.8716 19.7283 14.1446 19.5453 14.6666C18.4173 17.8566 15.3843 19.9996 12.0003 19.9996C7.5893 19.9996 4.0003 16.4116 4.0003 11.9996C4.0003 8.6156 6.1433 5.5826 9.3333 4.4546C9.8543 4.2716 10.1273 3.7006 9.9433 3.1796C9.7593 2.6596 9.1883 2.3856 8.6673 2.5706C4.6793 3.9796 2.0003 7.7686 2.0003 11.9996C2.0003 17.5136 6.4863 21.9996 12.0003 21.9996C16.2313 21.9996 20.0203 19.3216 21.4303 15.3326C21.6143 14.8126 21.3423 14.2416 20.8213 14.0576ZM14 10V4.071C17.061 4.511 19.489 6.938 19.929 10H14ZM13 2C12.448 2 12 2.447 12 3V11C12 11.553 12.448 12 13 12H21C21.552 12 22 11.553 22 11C22 6.037 17.962 2 13 2Z"/><mask id="PieChart-omask0" mask-type="alpha" maskUnits="userSpaceOnUse" x="2" y="2" width="20" height="20"><path id="PieChart-oMask_2" fillRule="evenodd" clipRule="evenodd" d="M20.8213 14.0576C20.2983 13.8716 19.7283 14.1446 19.5453 14.6666C18.4173 17.8566 15.3843 19.9996 12.0003 19.9996C7.5893 19.9996 4.0003 16.4116 4.0003 11.9996C4.0003 8.6156 6.1433 5.5826 9.3333 4.4546C9.8543 4.2716 10.1273 3.7006 9.9433 3.1796C9.7593 2.6596 9.1883 2.3856 8.6673 2.5706C4.6793 3.9796 2.0003 7.7686 2.0003 11.9996C2.0003 17.5136 6.4863 21.9996 12.0003 21.9996C16.2313 21.9996 20.0203 19.3216 21.4303 15.3326C21.6143 14.8126 21.3423 14.2416 20.8213 14.0576ZM14 10V4.071C17.061 4.511 19.489 6.938 19.929 10H14ZM13 2C12.448 2 12 2.447 12 3V11C12 11.553 12.448 12 13 12H21C21.552 12 22 11.553 22 11C22 6.037 17.962 2 13 2Z"/></mask><g mask="url(#PieChart-omask0)"><g id="PieChart-o&#PieChart-o240;&#PieChart-o159;&#PieChart-o142;&#PieChart-o168; Color"><rect id="PieChart-oBase" width="24" height="24"/></g></g></g></g>,
    })
))