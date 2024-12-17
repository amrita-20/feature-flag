import {ReactNode} from 'react';

type PanelProps = {
    title: string;
    children: ReactNode;
}

function Panel({ title, children }: PanelProps) {
    return (
        <div className='panel__wrapper'>
            <h1 className='panel__title'>{title}</h1>
            <p className='panel__content'>{children}</p>
        </div>
    )
}

export default Panel;