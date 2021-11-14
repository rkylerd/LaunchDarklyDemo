import styled from "styled-components"

const desktopWidth = '1600px';
const tabletWidth = '1024px';

export const MusicPlayerWrapper = styled.div<{ hidden?: boolean; }>`
    position: fixed;
    right: 0;
    top: 0;
    z-index: 10;
    transition: width .3s;
    @media (max-width: ${desktopWidth}) {
        width: 50vw;
    }
    @media (max-width: ${tabletWidth}) {
        width: 90vw;
    }

    &.hidden {
        width: 40px;
    }

    input[type = range] {
        width: 100%;
        margin: 6.6px 0;
        background-color: transparent;
        -webkit-appearance: none;
    }
    input[type = range]:focus {
        outline: none;
    }
    input[type = range]:: -webkit-slider-runnable-track {
        background: #292b2c;
        border-radius: 1.3px;
        width: 100%;
        height: 3.8px;
        cursor: pointer;
    }
    input[type = range]:: -webkit-slider-thumb {
        margin-top: -6.8px;
        width: 6px;
        height: 17px;
        background: #292b2c;
        border-radius: 2px;
        cursor: pointer;
        -webkit-appearance: none;
    }

    input[type = range]:: -moz-range-track {
        background: #292b2c;
        border-radius: 1.3px;
        width: 100%;
        height: 3.8px;
        cursor: pointer;
    }
    input[type = range]:: -moz-range-thumb {
        width: 6px;
        height: 17px;
        background: #292b2c;
        cursor: pointer;
    }
    input[type = range]:: -ms-track {
        background: transparent;
        border-color: transparent;
        border-width: 18.4px 0;
        color: transparent;
        width: 100%;
        height: 3.8px;
        cursor: pointer;
    }

    input[type = range]:: -ms-thumb {
        width: 6px;
        height: 17px;
        background: #292b2c;
        border-radius: 22px;
        cursor: pointer;
        margin-top: 0px;
        /*Needed to keep the Edge thumb centred*/
    }
`;

export const SliderWrapper = styled.div`
    display: flex;
    width: 100%;
        input {
        flex-grow: 1;
        margin: auto .5em;
    }
`;

export const FlexContainer = styled.div`
display: flex;
flex-direction: row;
`;

export const MusicPlayer = styled(FlexContainer)`

transition: width .3s;
border-left: solid .25em #292b2c;
border-bottom: solid .25em #292b2c;
background-color: rgb(247, 247, 247);
@media(max-width: ${desktopWidth}) {
    border-bottom-left-radius: 8px;
    min-height: 3em;
    width: 50vw;
        #slider {
        display: flex;
        width: 100%;
            input {
            flex-grow: 1;
            margin: auto .5em;
        }
    }
}
@media(max-width: ${tabletWidth}) {
    border-bottom-right-radius: 2px;
    width: 90vw;
}
    
    > div {
    margin: auto 0;
        &#caret {
        background-color: #292b2c;
        color: rgb(247, 247, 247);
        margin: auto .1em auto 0;
        width: 2em;
        height: 2em;
        min-width: 20px;
        border-bottom-right-radius: 4px;
        border-top-right-radius: 4px;
        cursor: pointer;
        transition: box-shadow .3s;
            > svg {
            width: 100%;
            height: 100%;
        }
    }
        &#buttons {
            > div {
                text-align: center;
                &#play {
                padding-left: 2px;
            }
            margin: auto .1em;
            width: 2em;
            height: 2em;
                &: nth-child(1) {
                padding-right: 2px;
            }
                &: nth-child(3) {
                padding-left: 2px;
            }
                &: nth-child(2) {
                width: 2.5em;
                height: 2.5em;
            }
            border-radius: 50%;
            background-color: rgb(247, 247, 247);
            cursor: pointer;
            transition: box-shadow .3s;
                > svg {
                width: 50%;
                height: 100%;
                margin: auto;
            }
                &:hover {
                -webkit-box-shadow: 0 0 10px #1f2b38;
                box-shadow: 0 0 10px #1f2b38;
            }
        }
    }
        &#slider {
            > span {
            font-size: small;
            margin-right: .3em;
            @media(max-width: ${tabletWidth}) {
                font-size: x-small;
            }
        }
    }
}
`;