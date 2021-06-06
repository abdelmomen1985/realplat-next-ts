import React from 'react'
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import { Unit } from '../../interfaces';
import useTranslation from './../../hooks/useTranslation';


const ComparingMobile = ({ comparingUnits, wishListHandler }:
  { comparingUnits: any, wishListHandler: (unit: Unit, wishListed: boolean) => void }) => {
  const { t, locale } = useTranslation();
  return (
    <Table className="">
      <Thead className="bg-primary text-white">
        <Tr>
          <Th>{t("prop_type")}</Th>
          <Th>{t("totalPrice")}</Th>
          <Th>{t("pricePerM")}</Th>
          <Th>{t("landArea")}</Th>
          <Th>{t("bua")}</Th>
          <Th>{t("deliveryDate")}</Th>
          <Th>{t("downPay")}</Th>
          <Th>{t("monthlyPay")}</Th>
          <Th>{t("totalYears")}</Th>
          <Th>{t("bedrooms")}</Th>
          <Th>{t("bathrooms")}</Th>
          <Th>{t("location")}</Th>
          <Th>{t("wishList")}</Th>
        </Tr>
      </Thead>
      {comparingUnits.map((unit: any) => (
        <Tbody
          key={unit.id}
          className="text-primary"
        >
          <Tr>
            <Td>{unit.property_type.name[locale]}</Td>
            <Td>
              {unit.fin_total} {t("egp")}
            </Td>
            <Td>
              {(unit.fin_total / unit.land).toFixed()}{" "}
              {t("egp") + "/" + t("meter")}
              <span className="mSquare">2</span>
            </Td>
            <Td>
              {unit.land} {t("meter")}
              <span className="mSquare">2</span>
            </Td>
            <Td>
              {unit.bua} {t("meter")}
              <span className="mSquare">2</span>
            </Td>
            <Td>{unit.delivery_year}</Td>
            <Td>
              {unit.fin_down_payment} {t("egp")}
            </Td>
            <Td>
              {unit.fin_monthly_payment} {t("egp")}
            </Td>
            <Td>
              {unit.fin_years} {t("years")}
            </Td>
            <Td>{unit.bedrooms}</Td>
            <Td>{unit.bathrooms}</Td>
            <Td>
              {" "}
              {locale === "ar" ? unit.sk_city.name_ar : unit.sk_city.name}
            </Td>
            <Td>

              <button
                onClick={() => wishListHandler(unit, unit.wishListed)}
                className={unit.wishListed ? 'bg-primary' : 'bg-custom-red'}
                style={{
                  color: "#fff",
                  borderRadius: "5px",
                  border: "none",
                  margin: "5px auto",
                  display: "block",
                  padding: "5px 15px",
                  textAlign: "center",
                }}
              >
                {unit.wishListed
                  ? "Remove from WishList"
                  : "Add to Wish List"}
              </button>
            </Td>
          </Tr>
        </Tbody>
      ))
      }
    </Table >
  )
}

export default ComparingMobile
