/**
The MIT License (MIT)
*/

import { Props, createIcon } from '../Icon'
import React from 'react'

export default React.forwardRef((props: Props, ref: React.RefObject<HTMLSpanElement>) => (
    createIcon(props, ref, {
        filled: <g><g id="Edit2Icon/Fill/edit-2"><path id="Edit2Mask" fillRule="evenodd" clipRule="evenodd" d="M17.9655 6.72867L15.2715 4.03467L13.3235 5.98367L16.0185 8.67867L17.9655 6.72867ZM5.0905 17.9957C5.0605 17.9987 5.0305 17.9997 5.0005 17.9997C4.7365 17.9997 4.4815 17.8957 4.2925 17.7067C4.0835 17.4967 3.9775 17.2047 4.0035 16.9097L4.3825 12.7397C4.4245 12.2827 4.6265 11.8507 4.9525 11.5257L13.9485 2.52967C14.6505 1.82467 15.9235 1.85967 16.6645 2.59867L19.4025 5.33667L19.4035 5.33767C20.1685 6.10367 20.1995 7.32167 19.4715 8.05167L10.4745 17.0487C10.1495 17.3737 9.7185 17.5757 9.2605 17.6177L5.0905 17.9957ZM5 20H19C19.55 20 20 20.45 20 21C20 21.55 19.55 22 19 22H5C4.45 22 4 21.55 4 21C4 20.45 4.45 20 5 20Z"/><mask id="Edit2mask0" mask-type="alpha" maskUnits="userSpaceOnUse" x="3" y="2" width="17" height="20"><path id="Edit2Mask_2" fillRule="evenodd" clipRule="evenodd" d="M17.9655 6.72867L15.2715 4.03467L13.3235 5.98367L16.0185 8.67867L17.9655 6.72867ZM5.0905 17.9957C5.0605 17.9987 5.0305 17.9997 5.0005 17.9997C4.7365 17.9997 4.4815 17.8957 4.2925 17.7067C4.0835 17.4967 3.9775 17.2047 4.0035 16.9097L4.3825 12.7397C4.4245 12.2827 4.6265 11.8507 4.9525 11.5257L13.9485 2.52967C14.6505 1.82467 15.9235 1.85967 16.6645 2.59867L19.4025 5.33667L19.4035 5.33767C20.1685 6.10367 20.1995 7.32167 19.4715 8.05167L10.4745 17.0487C10.1495 17.3737 9.7185 17.5757 9.2605 17.6177L5.0905 17.9957ZM5 20H19C19.55 20 20 20.45 20 21C20 21.55 19.55 22 19 22H5C4.45 22 4 21.55 4 21C4 20.45 4.45 20 5 20Z"/></mask><g mask="url(#Edit2mask0)"><g id="Edit2&#Edit2240;&#Edit2159;&#Edit2142;&#Edit2168; Color"><rect id="Edit2Base" width="24" height="24"/></g></g></g></g>,
        outline: <g><g id="Edit2-oIcon/Outline/edit-2"><path id="Edit2-oMask" fillRule="evenodd" clipRule="evenodd" d="M11.9831 7.32287L6.36614 12.9399L6.10214 15.8959L9.07914 15.6249L14.6791 10.0189L11.9831 7.32287ZM17.9661 6.72887L15.2711 4.03487L13.3231 5.98287L16.0181 8.67887L17.9661 6.72887ZM5.09114 17.9959C5.06014 17.9989 5.03014 17.9999 5.00014 17.9999C4.73614 17.9999 4.48114 17.8959 4.29314 17.7069C4.08314 17.4969 3.97714 17.2049 4.00414 16.9099L4.38314 12.7389C4.42514 12.2819 4.62714 11.8509 4.95214 11.5259L13.9481 2.52887C14.6501 1.82487 15.9241 1.85987 16.6641 2.59887L19.4021 5.33687H19.4031C20.1691 6.10387 20.1991 7.32087 19.4711 8.05087L10.4741 17.0479C10.1491 17.3739 9.71914 17.5749 9.26114 17.6169L5.09114 17.9959ZM5 20H19C19.55 20 20 20.45 20 21C20 21.55 19.55 22 19 22H5C4.45 22 4 21.55 4 21C4 20.45 4.45 20 5 20Z"/><mask id="Edit2-omask0" mask-type="alpha" maskUnits="userSpaceOnUse" x="4" y="2" width="16" height="20"><path id="Edit2-oMask_2" fillRule="evenodd" clipRule="evenodd" d="M11.9831 7.32287L6.36614 12.9399L6.10214 15.8959L9.07914 15.6249L14.6791 10.0189L11.9831 7.32287ZM17.9661 6.72887L15.2711 4.03487L13.3231 5.98287L16.0181 8.67887L17.9661 6.72887ZM5.09114 17.9959C5.06014 17.9989 5.03014 17.9999 5.00014 17.9999C4.73614 17.9999 4.48114 17.8959 4.29314 17.7069C4.08314 17.4969 3.97714 17.2049 4.00414 16.9099L4.38314 12.7389C4.42514 12.2819 4.62714 11.8509 4.95214 11.5259L13.9481 2.52887C14.6501 1.82487 15.9241 1.85987 16.6641 2.59887L19.4021 5.33687H19.4031C20.1691 6.10387 20.1991 7.32087 19.4711 8.05087L10.4741 17.0479C10.1491 17.3739 9.71914 17.5749 9.26114 17.6169L5.09114 17.9959ZM5 20H19C19.55 20 20 20.45 20 21C20 21.55 19.55 22 19 22H5C4.45 22 4 21.55 4 21C4 20.45 4.45 20 5 20Z"/></mask><g mask="url(#Edit2-omask0)"><g id="Edit2-o&#Edit2-o240;&#Edit2-o159;&#Edit2-o142;&#Edit2-o168; Color"><rect id="Edit2-oBase" width="24" height="24"/></g></g></g></g>,
    })
))