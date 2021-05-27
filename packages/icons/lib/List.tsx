/**
The MIT License (MIT)
*/

import { Props, createIcon } from '../Icon'
import React from 'react'

export default React.forwardRef((props: Props, ref: React.RefObject<HTMLSpanElement>) => (
    createIcon(props, ref, {
        filled: <g><g id="ListIcon/Fill/list"><path id="ListMask" fillRule="evenodd" clipRule="evenodd" d="M3 7C3 6.448 3.448 6 4 6C4.552 6 5 6.448 5 7C5 7.552 4.552 8 4 8C3.448 8 3 7.552 3 7ZM3 12C3 11.448 3.448 11 4 11C4.552 11 5 11.448 5 12C5 12.552 4.552 13 4 13C3.448 13 3 12.552 3 12ZM4 16C3.448 16 3 16.448 3 17C3 17.552 3.448 18 4 18C4.552 18 5 17.552 5 17C5 16.448 4.552 16 4 16ZM7.9355 11H20.0645C20.5795 11 21.0005 11.421 21.0005 11.936V12.064C21.0005 12.579 20.5795 13 20.0645 13H7.9355C7.4205 13 7.0005 12.579 7.0005 12.064V11.936C7.0005 11.421 7.4205 11 7.9355 11ZM20.0645 16H7.9355C7.4205 16 7.0005 16.421 7.0005 16.936V17.064C7.0005 17.579 7.4205 18 7.9355 18H20.0645C20.5795 18 21.0005 17.579 21.0005 17.064V16.936C21.0005 16.421 20.5795 16 20.0645 16ZM7.9355 6H20.0645C20.5795 6 21.0005 6.421 21.0005 6.936V7.064C21.0005 7.579 20.5795 8 20.0645 8H7.9355C7.4205 8 7.0005 7.579 7.0005 7.064V6.936C7.0005 6.421 7.4205 6 7.9355 6Z"/><mask id="Listmask0" mask-type="alpha" maskUnits="userSpaceOnUse" x="3" y="6" width="19" height="12"><path id="ListMask_2" fillRule="evenodd" clipRule="evenodd" d="M3 7C3 6.448 3.448 6 4 6C4.552 6 5 6.448 5 7C5 7.552 4.552 8 4 8C3.448 8 3 7.552 3 7ZM3 12C3 11.448 3.448 11 4 11C4.552 11 5 11.448 5 12C5 12.552 4.552 13 4 13C3.448 13 3 12.552 3 12ZM4 16C3.448 16 3 16.448 3 17C3 17.552 3.448 18 4 18C4.552 18 5 17.552 5 17C5 16.448 4.552 16 4 16ZM7.9355 11H20.0645C20.5795 11 21.0005 11.421 21.0005 11.936V12.064C21.0005 12.579 20.5795 13 20.0645 13H7.9355C7.4205 13 7.0005 12.579 7.0005 12.064V11.936C7.0005 11.421 7.4205 11 7.9355 11ZM20.0645 16H7.9355C7.4205 16 7.0005 16.421 7.0005 16.936V17.064C7.0005 17.579 7.4205 18 7.9355 18H20.0645C20.5795 18 21.0005 17.579 21.0005 17.064V16.936C21.0005 16.421 20.5795 16 20.0645 16ZM7.9355 6H20.0645C20.5795 6 21.0005 6.421 21.0005 6.936V7.064C21.0005 7.579 20.5795 8 20.0645 8H7.9355C7.4205 8 7.0005 7.579 7.0005 7.064V6.936C7.0005 6.421 7.4205 6 7.9355 6Z"/></mask><g mask="url(#Listmask0)"><g id="List&#List240;&#List159;&#List142;&#List168; Color"><rect id="ListBase" width="24" height="24"/></g></g></g></g>,
        outline: <g><g id="List-oIcon/Outline/list"><path id="List-oMask" fillRule="evenodd" clipRule="evenodd" d="M3 7C3 6.448 3.448 6 4 6C4.552 6 5 6.448 5 7C5 7.552 4.552 8 4 8C3.448 8 3 7.552 3 7ZM3 12C3 11.448 3.448 11 4 11C4.552 11 5 11.448 5 12C5 12.552 4.552 13 4 13C3.448 13 3 12.552 3 12ZM4 16C3.448 16 3 16.448 3 17C3 17.552 3.448 18 4 18C4.552 18 5 17.552 5 17C5 16.448 4.552 16 4 16ZM7.9355 11H20.0645C20.5795 11 21.0005 11.421 21.0005 11.936V12.064C21.0005 12.579 20.5795 13 20.0645 13H7.9355C7.4205 13 7.0005 12.579 7.0005 12.064V11.936C7.0005 11.421 7.4205 11 7.9355 11ZM20.0645 16H7.9355C7.4205 16 7.0005 16.421 7.0005 16.936V17.064C7.0005 17.579 7.4205 18 7.9355 18H20.0645C20.5795 18 21.0005 17.579 21.0005 17.064V16.936C21.0005 16.421 20.5795 16 20.0645 16ZM7.9355 6H20.0645C20.5795 6 21.0005 6.421 21.0005 6.936V7.064C21.0005 7.579 20.5795 8 20.0645 8H7.9355C7.4205 8 7.0005 7.579 7.0005 7.064V6.936C7.0005 6.421 7.4205 6 7.9355 6Z"/><mask id="List-omask0" mask-type="alpha" maskUnits="userSpaceOnUse" x="3" y="6" width="19" height="12"><path id="List-oMask_2" fillRule="evenodd" clipRule="evenodd" d="M3 7C3 6.448 3.448 6 4 6C4.552 6 5 6.448 5 7C5 7.552 4.552 8 4 8C3.448 8 3 7.552 3 7ZM3 12C3 11.448 3.448 11 4 11C4.552 11 5 11.448 5 12C5 12.552 4.552 13 4 13C3.448 13 3 12.552 3 12ZM4 16C3.448 16 3 16.448 3 17C3 17.552 3.448 18 4 18C4.552 18 5 17.552 5 17C5 16.448 4.552 16 4 16ZM7.9355 11H20.0645C20.5795 11 21.0005 11.421 21.0005 11.936V12.064C21.0005 12.579 20.5795 13 20.0645 13H7.9355C7.4205 13 7.0005 12.579 7.0005 12.064V11.936C7.0005 11.421 7.4205 11 7.9355 11ZM20.0645 16H7.9355C7.4205 16 7.0005 16.421 7.0005 16.936V17.064C7.0005 17.579 7.4205 18 7.9355 18H20.0645C20.5795 18 21.0005 17.579 21.0005 17.064V16.936C21.0005 16.421 20.5795 16 20.0645 16ZM7.9355 6H20.0645C20.5795 6 21.0005 6.421 21.0005 6.936V7.064C21.0005 7.579 20.5795 8 20.0645 8H7.9355C7.4205 8 7.0005 7.579 7.0005 7.064V6.936C7.0005 6.421 7.4205 6 7.9355 6Z"/></mask><g mask="url(#List-omask0)"><g id="List-o&#List-o240;&#List-o159;&#List-o142;&#List-o168; Color"><rect id="List-oBase" width="24" height="24"/></g></g></g></g>,
    })
))