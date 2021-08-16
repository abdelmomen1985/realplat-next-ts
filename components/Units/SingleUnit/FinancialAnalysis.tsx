import React from 'react';
import useTranslation from '../../../hooks/useTranslation';
import { Unit } from '../../../interfaces';

export default function FinancialAnalysis({ unit }: { unit: Unit }) {
	const { t } = useTranslation();

	return (
		<div className="border-gray-300 rounded-md shadow-md">
			<h3
				className="mb-3 py-4 w-100 px-5 rounded-md text-text-secondary flex justify-start items-center"
				style={{ backgroundColor: '#F5F6F7' }}
			>
				<img src="/images/dollar.png" />
				<span className="text-lg font-medium mx-4 capitalize">
					{t('finDetails')}
				</span>
			</h3>
			<ul className="list-disc my-5 py-4 px-5 mx-3">
				<li className="my-2 text-text-secondary text-lg font-medium">
					{t('pricePerM')}: {(unit.fin_total / unit.land).toFixed()} {t('egp')}
				</li>
				<li className="my-2 text-text-secondary text-lg font-medium">
					{t('totalPrice')}: {unit.fin_total.toFixed()?.toLocaleString()}{' '}
					{t('egp')}
				</li>
				<li className="my-2 text-text-secondary text-lg font-medium">
					{t('NPV')}: {unit.npv.toFixed()} {t('egp')}
				</li>
			</ul>
		</div>
	);
}
