import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { useOfferLetterData } from '@/lib/api/offer-letter/functions'
import { format, differenceInCalendarMonths } from 'date-fns'
import { toWords } from 'number-to-words'
import { useState } from 'react'

const returnSex = (
  sex: string,
  maritalStatus: string,
  address?: boolean
): string => {
  switch (sex) {
    case 'male':
      if (!address) {
        return 'MR'
      } else {
        return 'Sir'
      }
    case 'female':
      if (!address) {
        if (maritalStatus !== 'single') {
          return 'MRS'
        } else {
          return 'MS'
        }
      } else {
        return 'Ma'
      }
    default:
      return ''
  }
}

const formatLoanAmount = (amount: string): string => {
  return '₦' + parseFloat(amount).toLocaleString()
}

const calculateTenure = ({
  disbursementDate,
  maturityDate,
}: {
  disbursementDate: Date
  maturityDate: Date
}) => {
  return differenceInCalendarMonths(maturityDate, disbursementDate)
}

export const Template = ({ loanId }: { loanId: string }) => {
  // TODO: fetch loan and render template if final approved true

  const { data } = useOfferLetterData(loanId)
  const [repaymentPattern, setRepaymentPattern] = useState<number>(0)
  const [totalLoanRepayment, settotalLoanRepayment] = useState<number>(0)

  const [open, setOpen] = useState(false)

  if (!data) {
    return <div></div>
  }

  return (
    <div className="w-full flex flex-col items-start p-12 font-['tinos']">
      {/* Title */}
      <span className="font-bold text-xl self-center">OFFER LETTER</span>

      {/* Date */}
      <div className="w-full mt-6 flex justify-end font-bold">
        {/* {format(new Date(), 'dd/MM/yyyy')} */}
        {data.disbursement_date &&
          format(new Date(data.disbursement_date), 'dd/MM/yyyy')}
      </div>

      {/* Client Business & Address */}
      <div className="w-full mt-3 flex justify-start font-bold">
        {data.business_name}
      </div>
      <div className="w-72 text-left text-wrap justify-start">
        {data.business_address}
      </div>

      {/* Attention */}
      <div className="font-bold mt-6 uppercase">
        ATTENTION: {returnSex(data.sex, data.marital_status)}. {data.name}
      </div>

      {/* Dear Sir/Ma */}
      <div className="mt-6">
        Dear {returnSex(data.sex, data.marital_status, true)},
      </div>

      {/* Offer of credit facility */}
      <div className="font-bold mt-6 underline">
        OFFER OF CREDIT FACILITY:{' '}
        {data.new_loan_amount && formatLoanAmount(data.new_loan_amount)}
      </div>

      {/* 1st Paragraph */}
      <div className="mt-6 text-justify w-full">
        We refer to your application for a credit facility and are pleased to
        inform you that Management of ALERT MICROFINANCE BANK LIMITED has
        approved the granting of your request under the following terms and
        conditions:
      </div>

      {/* List */}
      <div className="w-full mt-6 flex flex-col justify-start items-start gap-6">
        {/* item 1 */}
        <div className="flex w-[40rem] justify-between">
          <span className="w-1/3">Lender:</span>
          <span className="w-2/3">ALERT Microfinance Bank Limited</span>
        </div>

        {/* item 2 */}
        <div className="flex w-[40rem] justify-between">
          <span className="w-1/3">Borrower:</span>
          <span className="w-2/3 font-bold">{data.business_name}</span>
        </div>

        {/* item 3 */}
        <div className="flex w-[40rem] justify-between">
          <span className="w-1/3">Facility Type:</span>
          <span className="w-2/3 font-bold">SME LOAN</span>
        </div>

        {/* item 4 */}
        <div className="flex w-[40rem] justify-between">
          <span className="w-1/3">Facility Amount:</span>
          <span className="w-2/3 font-bold capitalize">
            {data.new_loan_amount &&
              formatLoanAmount(data.new_loan_amount) +
                ' ' +
                '(' +
                toWords(data.new_loan_amount) +
                ' Naira Only' +
                ')'}
          </span>
        </div>

        {/* item 5 */}
        <div className="flex w-[40rem] justify-between">
          <span className="w-1/3">Collecion Date:</span>
          <span className="w-2/3 font-bold">
            {data.disbursement_date &&
              format(new Date(data.disbursement_date), 'dd/MM/yyyy')}
          </span>
        </div>

        {/* item 6 */}
        <div className="flex w-[40rem] justify-between">
          <span className="w-1/3">Expiry Date:</span>
          <span className="w-2/3 font-bold">
            {data.maturity_date &&
              format(new Date(data.maturity_date), 'dd/MM/yyyy')}
          </span>
        </div>

        {/* item 7 */}
        <div className="flex w-[40rem] justify-between">
          <span className="w-1/3">Purpose:</span>
          <span className="w-2/3 font-bold uppercase">
            {data.loan_purpose && data.loan_purpose}
          </span>
        </div>

        {/* item 8 */}
        <div className="flex w-[40rem] justify-between">
          <span className="w-1/3">Tenor:</span>
          <span className="w-2/3 font-bold">
            {' '}
            {data.disbursement_date &&
              calculateTenure({
                disbursementDate: new Date(data.disbursement_date),
                maturityDate: new Date(data.maturity_date),
              })}{' '}
            Months
          </span>
        </div>

        {/* item 9 */}
        <div className="flex w-[40rem] justify-between">
          <span className="w-1/3">Interest Rate:</span>
          <span className="w-2/3 font-bold">
            2.2% flat per month on straight line Basis
          </span>
        </div>

        {/* item 10 */}
        <div className="flex w-[40rem] justify-between">
          <span className="w-1/3">Insurance Fee:</span>
          <span className="w-2/3 font-bold">
            2% of the disbursed amount payable upfromt
          </span>
        </div>

        {/* item 11 */}
        <div className="flex w-[40rem] justify-between">
          <span className="w-1/3">Management Fee:</span>
          <span className="w-2/3 font-bold">
            1% of the disbursed amount payable upfront
          </span>
        </div>

        {/* item 12 */}
        <div className="flex w-[40rem] justify-between">
          <Dialog>
            <DialogTrigger>
              <span className="w-1/3 cursor-pointer font-bold">
                Repayment Pattern:
              </span>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>Set Repayment Pattern</DialogHeader>
              <Input
                type="number"
                onChange={(e) =>
                  setRepaymentPattern(parseFloat(e.target.value ?? 0))
                }
              />
            </DialogContent>
          </Dialog>
          <span className="w-2/3 text-balance">
            Monthly repayment of{' '}
            <span className="font-bold capitalize">
              ₦{repaymentPattern.toLocaleString()}{' '}
              <span>({toWords(repaymentPattern)} Naira Only)</span>
            </span>
            <span className="text-red-600 font-bold">
              {' '}
              See repayment plan for detail
            </span>
          </span>
        </div>

        {/* item 13 */}
        <div className="flex w-[40rem] justify-between">
          <Dialog>
            <DialogTrigger>
              <span className="w-1/3 cursor-pointer font-bold">
                Total Loan Repayment:
              </span>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>Set Total Loan Repayment</DialogHeader>
              <Input
                type="number"
                onChange={(e) =>
                  settotalLoanRepayment(parseFloat(e.target.value ?? 0))
                }
              />
            </DialogContent>
          </Dialog>
          <span className="w-2/3 text-balance font-bold capitalize">
            N{totalLoanRepayment.toLocaleString()} (
            {toWords(totalLoanRepayment)} Naira Only),
          </span>
        </div>

        {/* item 14 */}
        <div className="flex w-[40rem] justify-between">
          <span className="w-1/3 text-red-600 text-bold font-bold">
            Moratorium:
          </span>
          <span className="w-2/3 text-balance text-red-600 font-bold">
            Not Applicable (N/A), and stated where applicable
          </span>
        </div>
      </div>

      {/* Conditions */}
      <div className="w-full mt-6 flex flex-col gap-2 text-justify">
        <span className="underline font-semibold">
          Conditions Precedent to Drawdown
        </span>
        <ol>
          <li>1. Copy of the Offer Letter duly accepted by the Borrower</li>
          <li>2. Receipt of all upfront charges payable by the Borrower</li>
          <li>
            3. Receipt of SIX (6) post dated of First bank from the Borrower
            which is to be presented for payment each month without recourse to
            Mr. Oye Olufemi Folusho.
          </li>
          <li>
            4. Duly Executed Deed of Continuing and Unconditional Personal
            Guarantee to be executed in front of a staff of Alert Microfinance
            Bank Limited
          </li>
          <li>
            5. Provision of pledged collaterals as listed on the schedule A of
            Security Agreement and/or Deed of conveyance.
          </li>
          <li className="font-bold text-red-600">
            6. Execution of Repayment Plan
          </li>
        </ol>
      </div>

      {/* Other Conditions */}
      <div className="w-full mt-6 flex flex-col gap-2 text-justify">
        <span className="underline font-semibold">Other Conditions:</span>
        <ol>
          <li>
            1. In the event of default by the borrower in repayment of the
            facility or interest arising thereon or in compliance with the terms
            and conditions, and covenants contained herein, the Bank reserves
            the right to call in the facility, demand immediate repayment of all
            outstanding on the facility and or crystallize the security
          </li>
          <li>
            2. If any installment or amount due remains unpaid after the due
            date, an additional 2% fee per month shall be charged on the amount
            due-and-unpaid until full repayment.
          </li>
          <li>
            3. In the event of default, the Bank in its absolute discretion and
            without the consent of, or notice to the Borrower reserve the right
            to apply the guarantee and or seek repayment through any means, and
            any cost incurred in that process shall be debited to the Borrower’s
            account.
          </li>
          <li>
            4. The Borrower shall pay N5, 000.00 in addition to COT for any of
            his cheque dishonored upon presentation for payment by the lender.
          </li>
          <li>
            5. The Bank reserves the right, and in its absolute discretion, to
            vary, alter or amend any of the terms and conditions of this
            facility without prior notification or consent of the borrower.
          </li>
        </ol>
      </div>

      {/* Events of Default */}
      <div className="w-full mt-3 flex flex-col gap-2 text-justify">
        <span className="underline font-semibold">Events of Default</span>
        <span>
          The occurrence of any of the followings shall cause all outstanding(s)
          under the facility to be due and immediately repayable:
        </span>
        <ol>
          <li>
            a) If the Borrower fails to settle when due, any outstanding amount
            owed to and advised by the Bank; or
          </li>
          <li>
            b) If in the opinion of the Bank there is an adverse material change
            in the employment or financial condition of the Borrower; or
          </li>
          <li>
            c) If any extra-ordinary situation arises such that the continuance
            of the transaction in the opinion of the Bank makes it impossible
            for the Borrower to discharge its obligation.
          </li>
        </ol>
        <span>
          This offer is subject to availability of funds. <br /> If the above
          terms and conditions are acceptable to you, please execute and return
          to us the attached duplicate copies of this Offer Letter as an
          indication of such acceptance. The Bank reserves the right to regard
          the offer contained herein as lapsed should the executed duplicate
          copies not be returned to us within two weeks of the date of this
          offer letter.
        </span>
      </div>

      {/* Yours Faitfully */}
      <div className="w-full mt-3 flex flex-col">
        <span>Yours Faithfully;</span>
        <div>For: ALERT MICROFINANCE BANK LIMITED</div>
      </div>

      {/* Signatory */}
      <div className="w-full mt-3 flex items-center justify-between">
        <div className="flex flex-col">
          <span>
            .......................................................................................
          </span>
          <span>Authorized Signatory</span>
        </div>
        <div className="flex flex-col">
          <span>
            .......................................................................................
          </span>
          <span>Authorized Signatory</span>
        </div>
      </div>

      {/* Memorandum of Acceptance */}
      <div className="w-full mt-6 flex flex-col gap-5">
        <div className="font-bold text-xl">MEMORANDUM OF ACCEPTANCE</div>

        <span className="w-full text-justify text-wrap">
          I{' '}
          <span className="w-fit text-wrap">
            ........................................................................................................................................................................
          </span>{' '}
          hereby accept this offer under the above stated terms and conditions,
          and also authorize Alert Microfinance Bank Limited to recover its
          total outstanding balance from any of my account in other banks using
          my BVN in the event of default in payment of this loan. Reserves the
          right to debit my account with any Financial Institution using the BVN
          provided in the event of default in repayment of this facility
        </span>

        <span>
          Signature and
          Date............................................................................................
        </span>
      </div>
    </div>
  )
}
