import styled from 'styled-components'

export const SidebarContainer = styled.div`
    box-shadow: 0 8px 10px 0 rgb(183 192 206 / 20%);
`

export const ProfileWrapper = styled.div`
    width: 100%;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

export const ProfileImage = styled.div`
    width: 7.5rem;
    height: 7.5rem;
    background-image: url(https://scontent-hkg4-1.xx.fbcdn.net/v/t1.6435-1/83445388_2423230741323586_2331765335868309504_n.jpg?stp=dst-jpg_s200x200&_nc_cat=107&ccb=1-7&_nc_sid=7206a8&_nc_ohc=9ZMrP7BsC5IAX-gabWu&tn=Vo_L4bz-6If-eYJC&_nc_ht=scontent-hkg4-1.xx&oh=00_AT8zFM6uCR2q2bs2by-uM84jGSSxGbfyQQkHh48dTWY-hw&oe=62B171F5);
    background-position: center;
    background-size: contain;

    border: 1px solid #ffffff;
    filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
    border-radius: 8px;
`
export const SidebarActionWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

    & > button {
        margin: 0 12px;
    }
`
