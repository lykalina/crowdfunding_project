import { useCallback, useEffect, useRef, useState } from 'react';
import { useGetRanchesQuery } from '../../services/ranchesApi';
import img1 from '../../assets/images/1.webp';
import img2 from '../../assets/images/2.webp';
import img3 from '../../assets/images/3.webp';

export function useHomePageViewModel() {
    const imageBoxesData = [
        {
            id: 1,
            img: img1,
            alt: 'img1',
            info: 'Rent your own piece of farmland and watch your vegetables grow.'
        },
        {
            id: 2,
            img: img2,
            alt: 'img2',
            info: 'Enjoy, year after year, the wonders of nature with your rented vegetable farmland (60 sqm / 30 sqm).'
        },
        {
            id: 3,
            img: img3,
            alt: 'img3',
            info: 'Grow your own piece of land, from planting seeds in the lush soil to harvesting your own vegetables.'
        }
    ]

    return {
        imageBoxesData
    };
}