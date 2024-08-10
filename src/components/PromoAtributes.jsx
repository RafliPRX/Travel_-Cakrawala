import axios from "axios";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { formatRupiah } from "@/lib/utils";
// import { format } from "date-fns";
import moment from "moment";

const PromoAtributes = () => {
  const param = useParams();
  const [detailPromo, setDetailPromo] = useState({});

  const getDetailPromo = () => {
    axios
      .get(
        `https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/promo/${param.id}`,
        {
          headers: {
            apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
          },
        }
      )
      .then((res) => {
        // console.log(res);
        setDetailPromo(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getDetailPromo();
  }, []);

  return (
    <div className="flex items-center gap-5 p-10 max-sm:flex-col">
      <img
        className="object-cover w-1/2 rounded-t-full max-sm:w-[300px]"
        src={detailPromo.imageUrl}
        alt="imgPromo"
      />
      <div className="w-1/2 p-5 max-sm:w-screen">
        <p className="mb-2 text-2xl font-bold text-center">{detailPromo.title}</p>
        <table className="w-full text-lg max-sm:text-sm">
          <tr>
            <td className="font-bold">Description</td>
            <td>:</td>
            <td>{detailPromo.description}</td>
          </tr>
          <tr>
            <td className="font-bold">Promo Code</td>
            <td>:</td>
            <td>{detailPromo.promo_code}</td>
          </tr>
          <tr>
            <td className="font-bold">Minimum Claim Price</td>
            <td>:</td>
            <td>{formatRupiah(detailPromo.minimum_claim_price)}</td>
          </tr>
          <tr>
            <td className="font-bold">Discount Price</td>
            <td>:</td>
            <td>{formatRupiah(detailPromo.promo_discount_price)}</td>
          </tr>
          <tr>
            <td className="font-bold">Terms and Conditions</td>
            <td>:</td>
            <td>{detailPromo.terms_condition}</td>
          </tr>
          <tr>
            <td className="font-bold">Created at</td>
            <td>:</td>
            <td>
              {moment(detailPromo.createdAt).format("DD-MM-YYYY hh:mm")}
            </td>
          </tr>
          <tr>
            <td className="font-bold">Last Update</td>
            <td>:</td>
            <td>
              {moment(detailPromo.updatedAt).format("DD-MM-YYYY hh:mm")}
            </td>
          </tr>
        </table>
      </div>
    </div>
  );
};

export default PromoAtributes;
