import { faEllipsisH } from '@fortawesome/free-solid-svg-icons';
import { FC, MouseEvent, ReactNode, useRef, useState } from 'react'
import { watchButtonPress } from '../../utils/keyboard';
import { OptionsIcon, OptionsList, OptionsWrapper, Styles } from './tags';

type OptionsProps = {
    color?: string;
    OptionsDisplayElement?: ReactNode;
} & Styles;
const defaultOptionsDisplayElement = <OptionsIcon color="#292b2c" size="1x" icon={faEllipsisH} />;
const Options: FC<OptionsProps> = ({ children, OptionsDisplayElement = defaultOptionsDisplayElement, color, ...rest }): JSX.Element => {
    const ref = useRef<HTMLDivElement | null>(null);
    const [isShowing, setShowingOptions] = useState<boolean>(false);
    const [styles, setStyles] = useState<{ top?: number; left?: number; }>({ top: undefined, left: undefined });

    const toggleOpen = (e: MouseEvent) => {
        if (isShowing) {
            ref.current?.blur();
            setShowingOptions(false);
        } else {
            e.stopPropagation();
            ref.current?.focus();
            setShowingOptions(true);

            const { bottom = 0, left = 0 } = ref.current?.getBoundingClientRect() || {};
            setStyles({ top: bottom - 12 + window.scrollY, left: left + 18 + scrollX });

            document.addEventListener("click", () => {
                setShowingOptions(false);
                ref.current?.blur();
            }, { capture: false, once: true });
        }
    };

    return (
        <OptionsWrapper color={color} tabIndex={1} {...rest} ref={ref} onClick={toggleOpen} onKeyPress={(e) => e.currentTarget.click()}>
            {OptionsDisplayElement}
            {document.activeElement === ref.current &&
                <OptionsList {...styles}>
                    {children}
                </OptionsList>
            }
        </OptionsWrapper>
    );
};

export default Options;