import React, { useState, useEffect } from 'react';
import '../scss/tabs.scss';

interface Item {
    name: string;
    id: string;
    image: string;
    bgColor: string;
    tags: string[];
}

interface Props {
    dataUrl: string;
    allTagsDefaultLabel: string;
}

const Tabs: React.FC<Props> = ({ dataUrl, allTagsDefaultLabel }) => {
    const [activeTab, setActiveTab] = useState<string>(allTagsDefaultLabel);
    const [data, setData] = useState<Item[]>([]); // Состояние для хранения данных

    useEffect((): void => {
        async function fetchData(): Promise<void> {
            try {
                const response = await fetch(dataUrl);
                const fetchedData = await response.json();
                setData(fetchedData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }

        fetchData();
    }, [dataUrl]);

    const handleChangeTab = (tab: string): void => {
        setActiveTab(tab);
    };

    const filteredData = activeTab === allTagsDefaultLabel ? data : data.filter(item => item.tags.includes(activeTab));

    const renderTabs = () => {
        const allTags: string[] = [allTagsDefaultLabel, ...new Set(data.flatMap(item => item.tags))];
        return allTags.map(tag => (
            <li key={tag} className={`tabs-container__tab ${activeTab === tag ? 'active' : ''}`} onClick={() => handleChangeTab(tag)}>
                {tag}
            </li>
        ));
    };

    const renderItems = () => {
        return filteredData.map(item => (
            <div key={item.id} className="tabs-container__item" >
                <div className="tabs-container__image" style={{ backgroundColor: item.bgColor }}>
                    <img src={item.image} alt={item.name}/>
                </div>
                <h3 className={'tabs-container__item-title'}>{item.name}</h3>
            </div>
        ));
    };

    return (
        <div className="tabs-container">
            <ul className="tabs-container__sidebar">
                {renderTabs()}
            </ul>
            <div className="tabs-container__items">
                {renderItems()}
            </div>
        </div>
    );
};

export default Tabs;
