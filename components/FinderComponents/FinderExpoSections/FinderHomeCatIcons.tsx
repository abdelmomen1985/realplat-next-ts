import clsx from 'clsx';
import React, { useState } from 'react';
import styles from './finderExpo.module.scss';
import useTranslation from './../../../hooks/useTranslation';

export default function FinderHomeCatIcons({
	homepageCategories,
}: {
	homepageCategories: any[];
}) {
	const { locale } = useTranslation();
	return (
		<div className={clsx(styles.categoriesXSScroll, 'mt-8 flex')}>
			{homepageCategories.map((cat: any) => (
				<div key={cat?.id} className={styles.categorysquare}>
					<div className={styles.icon1}>
						<img className="apartment" src={cat?.images[0].url} />
					</div>
					<div
						className={clsx(
							styles.notosansBoldMirage_16px,
							styles.categoryName
						)}
					>
						{cat[`name_${locale}`]}
					</div>
				</div>
			))}
		</div>
	);
}
