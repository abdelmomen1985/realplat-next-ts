import React from 'react'
import { useForm } from 'react-hook-form';
import styles from './homeStyles.module.scss';

interface SearchData {
  searchQuery: string;
}
const SearchForm = ({ placeHolder, title }: { placeHolder: string, title: string }) => {
  const { register, errors, handleSubmit, reset } = useForm({
    mode: 'onTouched',
    reValidateMode: 'onBlur',
    shouldFocusError: true
  })
  const searchHandler = (data: SearchData) => {
    console.log(data)
    reset();
  }
  return (
    <form onSubmit={handleSubmit(searchHandler)} className={styles.searchForm}>
      <input type="text" name="query"
        placeholder={placeHolder}
        style={{ backgroundColor: title === 'main' ? '#fff' : '#FBF6F6' }}
        ref={register({
          required: 'Please Enter a city first'
        })} />

      <button>
        <i className="fas fa-search" />
      </button>
    </form>
  )
}

export default SearchForm
