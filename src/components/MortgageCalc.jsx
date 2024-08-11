import React, { useEffect, useState } from 'react';
import Calc from '../assets/icon-calculator.svg';
import EmptyIllustration from '../assets/illustration-empty.svg';
import { yellow } from '@mui/material/colors';
import Radio from '@mui/material/Radio';

function MortgageCalc() {
  const [mortgageAmount, setMortgageAmount] = useState('');
  const [mortgageTerm, setMortgageTerm] = useState('');
  const [interest, setInterest] = useState('');
  const [selectedOption, setSelectedOption] = useState('');
  const [mortgageAmountError, setMortgageAmountError] = useState(false);
  const [mortgageTermError, setMortgageTermError] = useState(false);
  const [interestError, setInterestError] = useState(false);
  const [selectedOptionError, setSelectedOptionError] = useState(false);
  const [mortgageAmountNanError, setMortgageAmountNanError] = useState(false);
  const [mortgageTermNanError, setMortgageTermNanError] = useState(false);
  const [interestNanError, setInterestNanError] = useState(false);
  const [formSubmit, setFormSubmit] = useState(false);
  const [monthlyPayment, setMonthlyPayment] = useState('');
  const [totalPayments, setTotalPayments] = useState('');
  const [interestOnlyPayment, setInterestOnlyPayment] = useState('');
  const [monthlyInterestPayment, setMonthlyInterestPayment] = useState('');

  useEffect(() => {
    // Validate inputs for NaN values
    setMortgageAmountNanError(isNaN(mortgageAmount));
    setMortgageTermNanError(isNaN(mortgageTerm));
    setInterestNanError(isNaN(interest));
  }, [mortgageAmount, mortgageTerm, interest]);

  const validateInputs = () => {
    let isValid = true;

    if (!mortgageAmount || isNaN(mortgageAmount)) {
      setMortgageAmountError(true);
      isValid = false;
    } else {
      setMortgageAmountError(false);
    }

    if (!mortgageTerm || isNaN(mortgageTerm)) {
      setMortgageTermError(true);
      isValid = false;
    } else {
      setMortgageTermError(false);
    }

    if (!interest || isNaN(interest)) {
      setInterestError(true);
      isValid = false;
    } else {
      setInterestError(false);
    }

    if (!selectedOption) {
      setSelectedOptionError(true);
      isValid = false;
    } else {
      setSelectedOptionError(false);
    }

    return isValid;
  };

  const handleSubmit = () => {
    const isValid = validateInputs();
  
    if (isValid) {
      let principal = parseFloat(mortgageAmount);
      let monthlyInterestRate = parseFloat(interest) / (12 * 100);
      let numberOfMonths = parseFloat(mortgageTerm) * 12;
  
      if (monthlyInterestRate === 0 || numberOfMonths === 0 || principal === 0) {
        setMonthlyPayment('0');
        setTotalPayments('0');
        setInterestOnlyPayment('0');
        setMonthlyInterestPayment('0');
        setFormSubmit(true);
        return;
      }
  
      let emi = (principal * monthlyInterestRate * Math.pow(1 + monthlyInterestRate, numberOfMonths)) /
        (Math.pow(1 + monthlyInterestRate, numberOfMonths) - 1);
      let monthlyInterest = principal * monthlyInterestRate;
      let totalPayment = emi * numberOfMonths;
      let totalInterest = totalPayment - principal;
  
      setMonthlyPayment(emi);
      setTotalPayments(totalPayment);
      setInterestOnlyPayment(totalInterest);
      setMonthlyInterestPayment(monthlyInterest);
  
      setFormSubmit(true);
    } else {
      setFormSubmit(false);
    }
  };
  
  const clearAll = () => {
    setMortgageAmount('');
    setMortgageTerm('');
    setInterest('');
    setSelectedOption('');
    setFormSubmit(false);
    setMortgageAmountError(false);
    setMortgageTermError(false);
    setInterestError(false);
    setSelectedOptionError(false);
  };

  return (
    <>
      <div className='flex bg-blue-200 justify-center items-center min-h-screen'>
        <div className='flex flex-row max-w-3xl w-full bg-white rounded-3xl shadow-2xl max-md:flex-col max-md:w-full max-md:p-0 max-md:flex max-md:justify-center max-md:items-center'>
          <div className='flex flex-col w-full bg-white rounded-l-3xl p-8 max-md:rounded-none'>
            <div className='flex justify-between'>
              <h1 className='text-slate-700 font-medium'>Mortgage Calculator</h1>
              <button 
                onClick={clearAll}
                className='underline text-slate-500'>Clear All</button>
            </div>
            <div className='mt-5'>
              <label htmlFor='MortgageAmount' className='text-slate-700'>Mortgage Amount</label>
              <div className='relative group mt-2'>
                <span className={`absolute inset-y-0 left-0 w-9 flex items-center justify-center rounded-l-md group-focus-within:border-yellow-200 group-hover:group-focus-within:border-yellow-200
                  ${mortgageAmountError || mortgageAmountNanError
                    ? 'bg-[#D73328] text-white group-focus-within:bg-[#D73328]'
                    : 'bg-blue-200 text-slate-700 text-sm font-medium group-focus-within:bg-yellow-200 group-hover:border-l-black group-hover:border-t-black group-hover:border-b-black group-hover:border'
                }`}>
                  ₹</span>

                <input
                  type='text'
                  id='MortgageAmount'
                  className={`w-full pl-12 pr-4 py-1.5 rounded-md focus:ring-1 focus:outline-none 
                    hover:border-black
                    ${mortgageAmountError || mortgageAmountNanError
                      ? 'border-2 border-[#D73328] focus:ring-[#D73328] focus:border-[#D73328] hover:border-[#D73328]'
                      : 'border border-blue-200 focus:border-yellow-200 focus:ring-yellow-200 '
                    }`}
                  value={mortgageAmount}
                  onChange={(e) => setMortgageAmount(e.target.value)}
                />
                {mortgageAmountError && (
                  <span className='absolute right-0 top-full mt-2 text-[#D73328] text-sm font-semibold'>This field is required</span>
                )}
                {mortgageAmountNanError && (
                  <span className='absolute right-0 bottom-12 mt-2 text-[#D73328] text-xs font-semibold'>Amount must be higher than 0</span>
                )}
              </div>
            </div>
            <div className='mt-10 flex max-md:flex-col max-md:space-x-0 space-x-3'>
              <div className='flex flex-col'>
                <label htmlFor="MortgageTerm" className='text-slate-500'>Mortgage Term</label>
                <div className='relative group'>
                  <span className={`absolute inset-y-0 right-0 w-12 justify-center flex items-center rounded-r-md ${mortgageTermError ? 'bg-[#D73328] text-white' : 'text-slate-900 bg-blue-200 text-sm font-medium group-focus-within:bg-yellow-200'}`}>years</span>
                  <input
                    type="text"
                    id='MortgageTerm'
                    className={`w-full py-1.5 rounded-md pl-3 focus:outline-none ${mortgageTermError ? 'border-[#D73328] border-2 focus:border-[#D73328] focus:ring-[#D73328] focus:ring-1 active:ring-[#D73328]' : 'border-2 border-blue-200 focus:border-yellow-200 focus:ring-yellow-200 focus:ring-1'}`}
                    value={mortgageTerm}
                    onChange={(e) => setMortgageTerm(e.target.value)}
                  />
                  {mortgageTermError && (
                    <span className='absolute left-0 top-full mt-2 text-[#D73328] text-sm font-semibold'>This field is required</span>
                  )}
                  {mortgageTermNanError && (
                    <span className='absolute right-0 left-0 bottom-14 mt-2 text-[#D73328] text-sm font-semibold'>Term must be higher than 0</span>
                  )}
                </div>
              </div>
              <div className='flex flex-col max-md:mt-9'>
                <label htmlFor="InterestOnly" className='text-slate-500'>Interest Rate</label>
                <div className='relative group'>
                  <span className={`absolute inset-y-0 right-0 w-9 flex justify-center items-center rounded-r-md ${interestError ? 'bg-[#D73328] text-white' : 'text-slate-900 bg-blue-200 text-sm font-medium group-focus-within:bg-yellow-200'}`}>%</span>
                  <input
                    type="text"
                    id='InterestOnly'
                    className={`w-full py-1.5 rounded-md pl-3 focus:outline-none ${interestError ? 'border-[#D73328] border-2 focus:border-[#D73328] focus:ring-[#D73328] focus:ring-1 active:ring-[#D73328]' : 'border-2 border-blue-200 focus:border-yellow-200 focus:ring-yellow-200 focus:ring-1'}`}
                    value={interest}
                    onChange={(e) => setInterest(e.target.value)}
                  />
                  {interestError && (
                    <span className='absolute top-full left-0 mt-2 text-[#D73328] text-sm font-semibold'>This field is required</span>
                  )}
                  {interestNanError && (
                    <span className='absolute top-full left-0 right-0 mt-6 text-[#D73328] text-sm font-semibold'>Interest must be higher than 0</span>
                  )}
                </div>
              </div>
            </div>
            <div className='mt-10 flex-col items-center'>
              <span className='flex text-slate-500 font-semibold mb-3'>Mortgage Type</span>
              <div className='flex flex-col font-medium'>
                <div className={`flex items-center w-full border-2 py-0.5 rounded-md px-1 mb-2 hover:border-[#D7DA2F]
                  ${selectedOption === 'repayment' ? 'bg-yellow-50 border-yellow-200' : 'bg-white border-gray-300'}`}>
                  <Radio
                    name='o'
                    value='repayment'
                    id='repayment'
                    checked={selectedOption === 'repayment'}
                    onChange={() => setSelectedOption('repayment')}
                    sx={{
                      '&.Mui-checked': {
                        color: yellow[600],
                      }
                    }}
                  />
                  <label htmlFor="repayment" className='ml-1'>Repayment</label>
                </div>
                <div className={`flex items-center w-full border-2 py-0.5 rounded-md px-1 hover:border-[#D7DA2F]
                  ${selectedOption === 'interestonly' ? 'bg-yellow-50 border-yellow-200' : 'bg-white border-gray-300'}`}>
                  <Radio
                    name='o'
                    value='interestonly'
                    id='interestonly'
                    checked={selectedOption === 'interestonly'}
                    onChange={() => setSelectedOption('interestonly')}
                    sx={{
                      '&.Mui-checked': {
                        color: yellow[600],
                      }
                    }}
                  />
                  <label htmlFor="interestonly" className='ml-2'>Interest Only</label>
                </div>
              </div>
              {selectedOptionError && (
                <span className='text-[#D73328] text-sm font-semibold'>This field is required</span>
              )}
            </div>
            <div className='mt-5'>
              <button
                onClick={handleSubmit}
                className='border bg-[#D7DA2F] font-semibold border-[#D7DA2F] py-2.5 px-7 rounded-3xl flex items-center max-md:w-full justify-center hover:shadow-md ease-in-out transition duration-1000 hover:shadow-[#D7DA2F] hover:bg-yellow-200'>
                <img src={Calc} alt="" className='w-5 h-auto mr-2'/>
                <span>Calculate Repayments</span>
              </button>
            </div>
          </div>
          <div className='flex flex-col w-full px-6 bg-slate-900 justify-center items-center rounded-r-3xl rounded-bl-[60px] max-md:rounded-none max-md:py-4 max-md:px-1'>
            {formSubmit ? (
              <div className='flex flex-col justify-center items-center px-4 h-full max-md:px-0'>
                <div className='flex flex-col px-3'>
                  <h1 className='text-slate-100 text-md font-bold'>Your Results</h1>
                  <p className='text-slate-300 mt-2'>
                    Your results are shown below based on the information you provided. To adjust the results, edit the form and click "calculate repayments" again.
                  </p>
                  <div className='flex flex-col mt-10 bg-[#D7DA2F] pt-0.5 rounded-lg max-md:w-[100%]'>
                    <div className='flex flex-col bg-slate-800 px-8 py-5 rounded-lg max-md:py-2 max-md:px-3'>
                      {selectedOption === 'interestonly' && (
                        <>
                          <span className='text-slate-300 text-md'>Your Interest Rate</span>
                          <span className='text-5xl font-bold text-[#D7DA2F] mt-3 max-md:text-4xl max-md:font-bold'>₹{parseFloat(monthlyInterestPayment).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                        </>
                      )}
                      {selectedOption === 'repayment' && (
                        <>
                          <span className='text-slate-300'>Your Monthly Repayments</span>
                          <span className='text-5xl font-bold text-[#D7DA2F] mt-3 max-md:text-4xl max-md:font-bold'>₹{parseFloat(monthlyPayment).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                        </>
                      )}
                      <hr className='mt-8 mb-8 max-md:mb-2 max-md:mt-3' />
                      {selectedOption === 'repayment' && (
                        <>
                          <p className='text-slate-300'>Total you'll pay over the term</p>
                          <span className='text-2xl text-slate-100 mt-2'>₹{parseFloat(totalPayments).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                        </>
                      )}
                      {selectedOption === 'interestonly' && (
                        <>
                          <p className='text-slate-300 text-md'>Total Interest over the Years</p>
                          <span className='text-2xl text-slate-100 mt-2'>₹{parseFloat(interestOnlyPayment).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className='flex flex-col justify-center items-center'>
                <img src={EmptyIllustration} alt="" />
                <div className='flex flex-col justify-center items-center'>
                  <h1 className='text-slate-100 font-bold text-2xl mb-5'>Results shown here</h1>
                  <p className='text-slate-300 text-center'>
                    Complete the form and click "calculate repayments" to see what your monthly repayments would be.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default MortgageCalc;
