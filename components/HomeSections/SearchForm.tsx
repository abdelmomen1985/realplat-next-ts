import React from 'react'
import { useForm } from 'react-hook-form';
import styles from './homeStyles.module.scss';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

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
        <FontAwesomeIcon className={styles.searchIcon} icon={faSearch} />
      </button>
    </form>
  )
}

export default SearchForm
