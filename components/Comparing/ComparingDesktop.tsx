import React from 'react';
import { Unit } from '../../interfaces';
import useTranslation from './../../hooks/useTranslation';

const ComparingDesktop = ({
	comparingUnits,
	wishListHandler,
}: {
	comparingUnits: any;
	wishListHandler: (unit: Unit, wishListed: boolean) => void;
}) => {
	const { t, locale } = useTranslation();

	return (
		<div className="grid grid-cols-1 md:grid-cols-3 px-2 mx-auto w-8/12">
			<div className="py-3 border px-5 rounded-md mx-auto w-full font-bold text-xl bg-primary text-white">
				<h4 style={{ marginBottom: '30px' }}></h4>
				<h4>{t('prop_type')}</h4>
				<h4>{t('totalPrice')}</h4>
				<h4>{t('pricePerM')}</h4>
				<h4>{t('landArea')}</h4>
				<h4>{t('bua')}</h4>
				<h4>{t('deliveryDate')}</h4>
				<h4>{t('downPay')}</h4>
				<h4>{t('monthlyPay')}</h4>
				<h4>{t('totalYears')}</h4>
				<h4>{t('bedrooms')}</h4>
				<h4>{t('bathrooms')}</h4>
				<h4>{t('location')}</h4>
				<h4>{t('wishList')}</h4>
			</div>
			{comparingUnits.map((unit: Unit) => (
				<div
					key={unit.id}
					className="py-3 border px-5 rounded-md mx-auto w-full  font-bold text-xl text-primary"
				>
					<h3>
						{unit.property_type.name[locale]} {t('in')}{' '}
						{unit.compound.name[locale]} {t('compound')}
						{t('comma')} {unit.bedrooms} {t('bedrooms')}
						{t('comma')}{' '}
						{locale === 'en' ? unit.sk_city.name : unit.sk_city.name_ar}
					</h3>
					<h3>{unit.property_type.name[locale]}</h3>
					<h3>
						{unit.fin_total?.toLocaleString()} {t('egp')}
					</h3>
					<h3>
						{(unit.fin_total / unit.land).toFixed()}{' '}
						{t('egp') + '/' + t('meter')}
						<span className="mSquare">2</span>
					</h3>
					<h3>
						{unit.land} {t('meter')}
						<span className="mSquare">2</span>
					</h3>
					<h3>
						{unit.bua} {t('meter')}
						<span className="mSquare">2</span>
					</h3>
					<h3>{unit.delivery_year}</h3>
					<h3>
						{unit.fin_down_payment?.toLocaleString()} {t('egp')}
					</h3>
					<h3>
						{unit.fin_monthly_payment?.toLocaleString()} {t('egp')}
					</h3>
					<h3>
						{unit.fin_years} {t('years')}
					</h3>
					<h3>{unit.bedrooms}</h3>
					<h3>{unit.bathrooms}</h3>
					<h3> {locale === 'ar' ? unit.sk_city.name_ar : unit.sk_city.name}</h3>
					<button
						onClick={() => wishListHandler(unit, unit.wishListed)}
						className={unit.wishListed ? 'bg-primary' : 'bg-custom-red'}
						style={{
							color: '#fff',
							borderRadius: '5px',
							border: 'none',
							margin: '5px auto',
							display: 'block',
							padding: '5px 15px',
							textAlign: 'center',
						}}
					>
						{unit.wishListed ? 'Remove from WishList' : 'Add to Wish List'}
					</button>
				</div>
				//   <UnitCard key={unit.id} unit={unit} />
			))}
		</div>
	);
};

export default ComparingDesktop;
