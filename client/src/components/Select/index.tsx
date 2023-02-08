import React, {
    FunctionComponent,
    useRef,
    useState,
    useLayoutEffect,
} from 'react';
import styled from 'styled-components';

const LabelSelect = styled.div`
    border: 1px solid #e7e7e7;
    border-radius: 3px;
    padding: 7px 8px;
    background: #f7f7f7;
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 18px;
    color: #002e42;
    cursor: pointer;
    height: 30px;
    padding: 6px 8px;
    justify-content: space-between;
    display: flex;
    align-items: center;
`;

const DropdownList = styled.ul`
    list-style: none;
    border: 1px solid #d6d6d6;
    padding: 10px 0px 0px 0px;
    position: absolute;
    z-index: 1000;
    background: #fff;
    width: 100%;
    margin-top: 3px;
    border-radius: 3px;
    display: none;
    flex-direction: column;

    &.open {
        display: flex;
        max-height: 345px;
        overflow: scroll;
    }
`;

const DropdownListElement = styled.li`
    padding: 6px 10px 6px 5px;
    cursor: pointer;
    transition: 0.3s all ease-in-out;
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 18px;
    color: #002e42;

    &:hover {
        background: rgb(231, 231, 231) 30%;
    }
    &.disabled {
        background: rgb(231, 231, 231) 30%;
        color: #8b8c8e;
    }
`;

const ArrowIcon = styled.svg`
    transition: 0.3s all ease-in-out;

    &.animate {
        transform: rotate(180deg);
    }
`;

type Option = {
    name: string;
    default: boolean;
    isDisabled: boolean;
};
interface IProps {
    options: Option[];
    onChangeSelect: (option: string) => void;
    currentValue: string;
}

const Select: FunctionComponent<IProps> = ({
    options,
    onChangeSelect,
    currentValue,
}) => {
    const [openDropDown, setOpenDropDown] = useState<boolean>(false);

    const onOpen = () => {
        setOpenDropDown(true);
    };

    const onChangeSelectHandler = (name: string, isDisabled: boolean) => {
        if (isDisabled) return;
        onChangeSelect(name);
    };

    const renderOptions = () => {
        return options.map((option) => {
            return (
                <DropdownListElement
                    className={`${option.isDisabled ? 'disabled' : ''}`}
                    key={option.name.replace(' ', '-')}
                    onClick={() => {
                        onChangeSelectHandler(option.name, option.isDisabled);
                    }}
                >
                    {option.name}
                </DropdownListElement>
            );
        });
    };

    const ref = useRef<HTMLDivElement>(null);

    const handleClickOutside = (event: Event) => {
        const target = event.target as HTMLDivElement;
        if (ref.current && !ref.current.contains(target)) {
            setOpenDropDown(false);
        }
    };
    useLayoutEffect(() => {
        document.addEventListener('click', handleClickOutside, true);
        return () => {
            document.removeEventListener('click', handleClickOutside, true);
        };
    }, []);

    return (
        <>
            <LabelSelect ref={ref} onClick={onOpen}>
                {currentValue}
                <ArrowIcon
                    className={`${openDropDown ? 'animate' : ''}`}
                    width='10'
                    height='7'
                    viewBox='0 0 10 7'
                >
                    <path
                        d='M1.18164 0.539062L5 4.37695L8.81836 0.539062L10 1.71094L5 6.71094L0 1.71094L1.18164 0.539062Z'
                        fill='#AFAFAF'
                    />
                </ArrowIcon>
            </LabelSelect>
            <DropdownList className={`${openDropDown ? 'open' : ''}`}>
                {renderOptions()}
            </DropdownList>
        </>
    );
};

export default Select;
