import styled from 'styled-components'

export const Wrapper = styled.div`
    position: relative;
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    border: 1px dashed rgba(0, 0, 0, 0.5);
    min-height: 300px;
    width: 400px;
    margin: 16px auto;

    &:hover {
        & > label {
            display: block;
        }
    }
`
export const UploadButton = styled.label`
    position: absolute;
    display: none;
    z-index: 1;
`
export const Overlay = styled.label`
    display: none;
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.2);
`
