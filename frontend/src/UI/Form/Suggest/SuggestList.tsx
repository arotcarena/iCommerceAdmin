import { ReactNode, useEffect, useRef, useState } from 'react';
import { SuggestItemWrapper } from './SuggestItemWrapper';
import { useTranslation } from 'react-i18next';
import { EntityType } from 'type/entityTypes';
import { parentHasClassName } from 'functions/dom/parentElementChecker';

const getNextOrPrevSelectableOffset = (
    selected: number|null,
    suggests: EntityType[],
    direction: 'next' | 'prev',
    suggestItemIsSelectableCondition?: (suggest: EntityType) => boolean,
    offset?: number,
    count: number = 0
): number|null => {
    // to avoid infinite loop if no selectable offset exists
    if(count > suggests.length) {
        return null;
    }

    // on first call, initialize values
    if(selected === null) {
        selected = direction === 'next' ? 0: (suggests.length - 1);
        offset = selected;
    }
    if(offset === undefined) {
        offset = direction === 'next' ? selected + 1: selected - 1;
    }

    // if end or start is reached
    if(!suggests[offset]) {
        offset = direction === 'next' ? 0: (suggests.length - 1);
    }

    // if no selectable condition, use next/prev suggest
    if(!suggestItemIsSelectableCondition) {
        return offset;
    }

    // if selectable condition, verify if next/prev suggest is selectable
    const suggest = suggests[offset];
    if(suggestItemIsSelectableCondition(suggest)) {
        return offset;
    }

    // if suggest is not selectable, try the next/prev suggest
    const newOffsetToTry = direction === 'next' ? offset + 1: offset - 1;
    return getNextOrPrevSelectableOffset(selected, suggests, direction, suggestItemIsSelectableCondition, newOffsetToTry, count + 1);
}


type Props = {
    additionalClass?: string,
    suggests: EntityType[],
    onSelect: (suggest: EntityType) => void,
    onClose: () => void,
    renderSuggestItem: (suggest: EntityType) => string,
    onDefaultSelect?: () => void,
    suggestItemIsSelectableCondition?: (suggest: EntityType) => boolean,
    suggestNotSelectableLabel?: string,
    inModal?: boolean, // change element on which listen close click
};

export const SuggestList = ({
    additionalClass, 
    suggests, 
    onSelect, 
    onClose, 
    renderSuggestItem,
    onDefaultSelect,
    suggestItemIsSelectableCondition,
    suggestNotSelectableLabel,
    inModal = false,
}: Props) => {
    const {t} = useTranslation();
    const ref = useRef<HTMLDivElement|null>(null);

    //fermeture au click sur le côté
    useEffect(() => {
        if(inModal) {
            const element = document.body.querySelector<HTMLElement>('.modal-dialog');
            if(element) {
                const onModalClick = (e: any) => {
                    if(!parentHasClassName(e.target, 'suggest-list')) {
                        onClose();
                    }
                };
                element.addEventListener('click', onModalClick);
                return () => element.removeEventListener('click', onModalClick);
            }
        }
        document.body.addEventListener('click', onClose);
        return () => document.body.removeEventListener('click', onClose);
    //eslint-disable-next-line
    }, []);
    //fermeture à l'appui sur Tab
    useEffect(() => {
        const closeOnTabDown = (e: any) => {
            if(e.key === 'Tab') {
                onClose();
            }
        };
        document.addEventListener('keydown', closeOnTabDown);
        return () => document.removeEventListener('keydown', closeOnTabDown);
    //eslint-disable-next-line
    }, []);

    
    //utilisation au clavier
    const [selected, setSelected] = useState<number|null>(null);

    useEffect(() => {
        const onKeyDown = (e: any) => {
            switch(e.key) {
                case 'ArrowUp':
                    e.preventDefault();
                    setSelected(selected => {
                        return getNextOrPrevSelectableOffset(
                            selected,
                            suggests,
                            'prev',
                            suggestItemIsSelectableCondition
                        );
                    });
                    break;
                case 'ArrowDown':
                    e.preventDefault();
                    setSelected(selected => {
                        return getNextOrPrevSelectableOffset(
                            selected,
                            suggests,
                            'next',
                            suggestItemIsSelectableCondition
                        );
                    });
                    break;
                default: 
                    break;
            }
        };
        document.addEventListener('keydown', onKeyDown);
        return () => document.removeEventListener('keydown', onKeyDown);
    //eslint-disable-next-line
    }, [suggests]);

    useEffect(() => {
        const onKeyDown = (e: any) => {
           if(e.key === 'Enter') {
                e.preventDefault();
                e.stopPropagation();
                if(selected !== null) {
                    onSelect(suggests[selected]);
                } else if(onDefaultSelect) {
                    onDefaultSelect();
                }
           }
        }
        document.addEventListener('keydown', onKeyDown);
        return () => document.removeEventListener('keydown', onKeyDown);
    //eslint-disable-next-line
    }, [selected, suggests]);

    const stopPropagation = (e: any) => {
        e.stopPropagation();
    }

    //on keyboard use, auto scroll if necessary
    useEffect(() => {
        if(selected === null || typeof selected !== 'number' || !ref.current) {
            return;
        }
        const selectedElt = ref.current.querySelector('.suggest-item:nth-child(' + (selected + 1) + ')');
        selectedElt?.scrollIntoView({block: 'center'})
    }, [selected, ref]);

    if(suggests.length === 0) {
        return '';
    }
    
    return (
        <div
            ref={ref}
            className={'suggest-list' + (additionalClass ? ' ' + additionalClass: '')} 
            onClick={stopPropagation} 
            role="listbox" 
            aria-label={t('suggestions')}
            style={{scrollBehavior: 'smooth'}}
        >
            {
                suggests.map((suggest, index) => (
                    <SuggestItemWrapper 
                        key={index}
                        isSelected={selected === index}
                        suggest={suggest}
                        onSelect={onSelect}
                        isSelectable={!suggestItemIsSelectableCondition || suggestItemIsSelectableCondition(suggest)}
                        notSelectableLabel={suggestNotSelectableLabel}
                    >
                        <div dangerouslySetInnerHTML={{__html: renderSuggestItem(suggest)}} />
                    </SuggestItemWrapper>
                ))
            }
        </div>
    )
}



    
