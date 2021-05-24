import React, { useContext, useState } from 'react'
import { Unit } from '../../../interfaces'
import { AppContext } from './../../../Context/AppContextProvider';
import { useMutation } from '@apollo/client';
import { ADD_TO_WISHLIST } from '../../../query/user';
import { REMOVE_FROM_WISHLIST } from './../../../query/user';
import { UnitCard } from './../UnitCard';
import { useQuery } from '@apollo/client';
import { USER_WISHLIST_IDS } from '../../../query/unitsQuery';

const SimilarUnits = ({ units }: { units: Unit[] }) => {
  const { user, setComparing, setLoginModal } = useContext(AppContext);
  const [innerUnits, setInnerUnits] = useState<Unit[]>(units)
  const [addWishList] = useMutation(ADD_TO_WISHLIST);
  const [removeWishList] = useMutation(REMOVE_FROM_WISHLIST);
  const { data, refetch } = useQuery(USER_WISHLIST_IDS);

  const wishListHandler = async (unit: Unit, wishlisted: Boolean) => {
    // handle add to the server
    if (user) {
      unit.wishListed = !wishlisted;
      let wishListedUnit: Unit = { ...unit };
      let dummyUnits = [...innerUnits];
      dummyUnits = dummyUnits.map((unit) => {
        if (unit.id === wishListedUnit.id) return wishListedUnit;
        return unit;
      });
      setInnerUnits(dummyUnits);
      console.log(innerUnits);
      if (wishListedUnit.wishListed) {
        await addWishList({
          variables: {
            user_id: user.id,
            unit_id: unit.id,
          },
        });
      } else {
        await removeWishList({
          variables: {
            user_id: user.id,
            unit_id: unit.id,
          },
        });
        if (refetch) refetch();

      }
    } else {
      setLoginModal(true);
    }
  };
  const compareHandler = (unit: any, wishlisted: Boolean) => {
    console.log(unit);
    unit.comparing = !unit.comparing;
    let comparedUnit: Unit = { ...unit, wishListed: wishlisted };
    let dummyUnits = [...innerUnits];
    dummyUnits = dummyUnits.map((unit) => {
      if (unit.id === comparedUnit.id) return comparedUnit;
      return unit;
    });
    setComparing(comparedUnit);
    setInnerUnits(dummyUnits);
  };

  const wishlist_ids = data?.user_wishlist_aggregate.nodes.map(
    (node: any) => node.unit.id
  );
  return (
    <>
      <h2 className="text-2xl md:text-4xl font-semibold text-text-secondary my-3 px-2 py-3">Similar Homes You May Like</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 my-3 gap-2 justify-items-center justify-center items-center">
        {
          innerUnits.length > 0 &&
          innerUnits.map((unit: any) => (
            <UnitCard
              key={unit.id}
              unit={unit}
              wishListHandler={wishListHandler}
              compareHandler={compareHandler}
              wishlisted={
                wishlist_ids?.filter((id: any) => id === unit.id).length > 0
              }
            />
          ))}
        {innerUnits.length === 0 && <div>No Units Found</div>}
      </div>
    </>
  )
}

export default SimilarUnits
