"use client";

import { getInvoice } from "@/services/strapi";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

import "./styles.css";
import Image from "next/image";

export default function Page() {
  const { id } = useParams();
  const [invoice, setInvoice] = useState({});

  useEffect(() => {
    getInvoice(id).then((data) => {
      setInvoice(data);
    });
  }, [id]);
  console.log(invoice);
  if (!invoice.organization) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <header>
        <div class="invoice-info">
          <h2 class="title left-margin">FACTURA</h2>
          <div class="invoice-info-detail small-margins left-margin">
            <h3>Número:</h3>
            <p>{invoice.identificationNumber}</p>
            <div class="break"></div>
            <h3>Fecha:</h3>
            <p>{invoice.date}</p>
          </div>
        </div>

        <div class="logo">
          {invoice.organization.logo && (
            <Image
              src={invoice.organization.logo.url}
              alt="logo"
              width={120}
              height={120}
            />
          )}
        </div>
        <div class="company-data">
          <p>{invoice.organization.name}</p>
          <p>{invoice.organization.address.street}</p>
          <p>
            {invoice.organization.address.postalCode}{" "}
            {invoice.organization.address.city} -{" "}
            {invoice.organization.address.state}
          </p>
          <p>CIF {invoice.organization.taxIdentificationNumber}</p>
        </div>
      </header>
      <main>
        <div class="content-box customer-data">
          <div class="invoice-info-detail item small-margins left-margin">
            <h3>Cliente:</h3>
            <p>{invoice.customer.name}</p>
          </div>
          <div class="invoice-info-detail item small-margins left-margin">
            <h3>DOMICILIO</h3>
            <p>
              {invoice.customer.address.street}
              {", "}
              {invoice.customer.address.postalCode}
              {", "}
              {invoice.customer.address.city}
            </p>
          </div>
          <div class="invoice-info-detail item small-margins left-margin">
            <h3>C.I.F:</h3>
            <p>CIF {invoice.customer.taxIdentificationNumber}</p>
          </div>
        </div>

        <div class="container-table-products">
          <table id="products" align="center">
            <thead>
              <tr class="no-border">
                <th colspan="5"></th>
              </tr>
              <tr class="no-border"></tr>
              <tr>
                <th>Concepto</th>
                <th>Bultos</th>
                <th>Cantidad</th>
                <th>Precio</th>
                <th>Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {[...Array(15).keys()].map((index) => {
                const product = invoice.products[index] || {};

                return (
                  <tr key={index}>
                    <td>{product.name || ""}</td>
                    <td></td>
                    <td>{product.quantity || ""}</td>
                    <td>{product.price || ""}</td>
                    <td className="last-column-bold">
                      {product.total || "- €"}
                    </td>
                  </tr>
                );
              })}
              <tr>
                <td class="no-border" colspan="5"></td>
              </tr>
              <tr class="no-border"></tr>
              <tr>
                <td class="no-border border-top-0"></td>
                <td class="no-border border-top-0"></td>
                <td
                  class="left-bold-border align-right top-bold-border border-bottom-0 pr-1"
                  colspan="2"
                >
                  Total
                </td>
                <td class="last-column left-bold-border top-bold-border">
                  {invoice.total} €
                </td>
              </tr>
              <tr>
                <td class="no-border border-top-0"></td>
                <td class="no-border border-top-0"></td>
                <td class="left-bold-border border-right-0 align-right border-top-0 border-bottom-0 text-red">
                  Descuento
                </td>
                <td class="no-border align-right text-red border-top-0 pr-1">
                  0%
                </td>
                <td class="last-column left-bold-border">0,00 €</td>
              </tr>
              <tr>
                <td class="no-border border-top-0" colspan="2"></td>
                <td
                  class="left-bold-border align-right pr-1 border-top-0 border-bottom-0"
                  colspan="2"
                >
                  Base imponible
                </td>
                <td class="last-column left-bold-border">{invoice.total} €</td>
              </tr>
              <tr>
                <td class="no-border border-top-0" colspan="2"></td>
                <td class="left-bold-border border-right-0 border-top-0 border-bottom-0 align-right">
                  I.V.A
                </td>
                <td class="no-border align-right pr-1 border-top-0 border-bottom-0">
                  10%
                </td>
                <td class="last-column left-bold-border">
                  {invoice.total * 0.1} €
                </td>
              </tr>
              <tr>
                <td class="no-border border-top-0" colspan="2"></td>
                <td
                  class="left-bold-border bottom-bold-border border-top-0 align-right pr-1 text-bold"
                  colspan="2"
                >
                  Total factura
                </td>
                <td class="last-column-bold left-bold-border bottom-bold-border">
                  {invoice.total + invoice.total * 0.1} €
                </td>
              </tr>
              <tr>
                <td class="no-border" colspan="5"></td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="content-box payment-data">
          <div class="payment-info-detail item small-margins">
            <h3>Forma de pago:</h3>
            <p>TRANSFERENCIA BANCARIA IBAN: </p>
          </div>
        </div>
      </main>
      <footer>
        <p>RM BARCELONA</p>
        <p>Folio 113</p>
        <p>Hoja 469357</p>
        <p>Inscripción 1</p>
      </footer>
    </>
  );
}
