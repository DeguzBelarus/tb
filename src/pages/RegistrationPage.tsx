//== general imports
import { FC, useEffect, useState, useRef } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { selectUniversitiesList, universitiesListSave } from "../app/studentsSlice";
//== general imports

//== specific imports
import cities from "../cities.json"
//== specific imports

//== components imports
import { StatusChangeBox } from "../components/StatusChangeBox/StatusChangeBox";
//== components imports

//== style imports
import "./RegistrationPage.scss"
//== style imports

export const RegistrationPage: FC = () => {
   //== links to DOM elements
   const passwordInput: any = useRef(null)
   const passwordInputSecond: any = useRef(null)
   const emailInput: any = useRef(null)
   const citySelector: any = useRef(null)
   const universitylector: any = useRef(null)
   const mailingApprovalCheckbox: any = useRef(null)
   //== links to DOM elements

   //== redux toolkit variables
   const dispatch = useAppDispatch()
   const universitiesList = useAppSelector(selectUniversitiesList)
   //== redux toolkit variables

   //== general variables
   const universitiesURL: string = "http://universities.hipolabs.com/search?country=United+Kingdom"
   const [loading, setLoading]: any = useState(false)
   const [nameChangeMode, setNameChangeMode]: any = useState(false)
   const [citiesOptions, setCitiesOptions]: any = useState(cities)
   const [isMailingApproval, setIsMailingApproval]: any = useState(true)
   const [changeTime, setChangeTime]: any = useState(null)
   const [passwordErrorMessage, setPasswordErrorMessage]: any = useState(null)
   const [passwordSecondErrorMessage, setPasswordSecondErrorMessage]: any = useState(null)
   const [emailErrorMessage, setEmailErrorMessage]: any = useState(null)
   //== general variables

   //== specific variables
   const [formData, setFormData] = useState({
      name: "Человек №3596941",
      city: "",
      university: "",
      password: "",
      email: "",
      mailingApproval: true
   })

   const months = [
      "января",
      "февраля",
      "марта",
      "апреля",
      "мая",
      "июня",
      "июля",
      "августа",
      "сентября",
      "октября",
      "ноября",
      "декабря"
   ]
   //== specific variables

   //== methods
   const formDataUpdate = (event: any) => {
      setFormData({ ...formData, [event.target.name]: event.target.value })
   }

   const nameChangeModeHandler = () => {
      if (nameChangeMode) {
         setNameChangeMode(false)
      } else {
         setNameChangeMode(true)
      }
   }

   const nameUpdate = (newName: string) => {
      setFormData({ ...formData, name: newName })
   }

   const mailingApprovalHandler = () => {
      if (isMailingApproval) {
         setIsMailingApproval(false)
      } else {
         setIsMailingApproval(true)
      }
   }

   const getUniversitiesData = async (url: string) => {
      setLoading(true)

      const response = await fetch(url)
      const result = await response.json()

      setLoading(false)
      dispatch(universitiesListSave(result))
   }

   const formSubmit = (event: any) => {
      event.preventDefault()

      setPasswordErrorMessage(null)
      setPasswordSecondErrorMessage(null)
      setEmailErrorMessage(null)

      setFormData({
         ...formData, university: universitylector.current.value, city: citySelector.current.value
      })

      if (formData.password.length < 5) {
         return setPasswordErrorMessage("Используйте не менее 5 символов")
      }

      if (passwordInputSecond.current.value !== formData.password) {
         return setPasswordSecondErrorMessage("Пароли не совпадают")
      }

      if (formData.email.length < 8 || !formData.email.includes("@") || !formData.email.includes(".")) {
         return setEmailErrorMessage("Неверный email")
      }

      const date: any = new Date;
      const day: any = date.getDate()
      const month: any = months[date.getMonth()]
      let hours: any = date.getHours()
      let minutes: any = date.getMinutes()
      let seconds: any = date.getSeconds()

      if (hours < 10) {
         hours += "0"
      }

      if (minutes < 10) {
         minutes += "0"
      }

      if (seconds < 10) {
         seconds += "0"
      }

      setChangeTime(`${day} ${month} в ${hours}:${minutes}:${seconds}`)

      const data = JSON.stringify(formData)
      console.log(data);
   }
   //== methods

   //== react listeners
   useEffect(() => {
      setFormData({ ...formData, mailingApproval: isMailingApproval })
   }, [isMailingApproval])

   useEffect(() => {
      getUniversitiesData(universitiesURL)

      let selectedCitiesOptions = cities
         .filter((city) => {
            return Number(city.population) > 50000
         })
         .sort((previous: any, next: any) => {
            if (previous.city > next.city) {
               return 1
            }
            if (previous.city < next.city) {
               return -1
            }
            return 0
         })

      const maxPopulationCity = selectedCitiesOptions.reduce((max: any, city) => {
         if (max > city.population) {
            return city
         } else {
            max = city
            return max
         }
      }, 0)

      selectedCitiesOptions = selectedCitiesOptions
         .filter((city) => {
            return city !== maxPopulationCity
         })
      selectedCitiesOptions = [maxPopulationCity, ...selectedCitiesOptions]

      setCitiesOptions(selectedCitiesOptions)
   }, [])
   //== react listeners

   //== JSX
   return <div className="registration-page-wrapper">
      <form className="registration-form" onSubmit={formSubmit}>
         <div className="registration-form__upper-container">
            <span className="registration-form__header">{`Здравствуйте, `}

               {nameChangeMode && <StatusChangeBox
                  formData={formData}
                  nameUpdate={nameUpdate}
                  setNameChangeMode={setNameChangeMode}
               />}
            </span>

            <span className="registration-form__name">
               {formData.name}
            </span>

            <span className="registration-form__name-change-mode-button"
               onClick={nameChangeModeHandler}>
               Сменить статус
            </span>
         </div>

         <div className="registration-form__city-select-wrapper">Ваш город
            <select
               id="registration-form__city-input"
               title="выберите город"
               name="city"
               onChange={formDataUpdate}
               ref={citySelector}
            >
               {citiesOptions.map((cityOption: any, index: number) => {
                  return <option value={cityOption.city} key={index}>{cityOption.city}</option>
               })}
            </select>
         </div>

         <div className="registration-form__uneversity-select-wrapper">Ваш университет
            <select
               id="registration-form__university-input"
               title="выберите университет"
               name="university"
               onChange={formDataUpdate}
               ref={universitylector}
            >
               {universitiesList.map((universityOption: any, index: number) => {
                  return <option value={universityOption.name} key={index}>{universityOption.name}</option>
               })}
            </select>
         </div>

         <hr className="registration-form__line" />

         <div className="registration-form__password-input-wrapper">Пароль
            <input type="password"
               id="registration-form__password-input"
               required
               title="введите пароль"
               name="password"
               minLength={5}
               onChange={formDataUpdate}
               ref={passwordInput}
            />
            <span>Ваш новый пароль должен содержать не менее 5 символов.</span>
         </div>
         <span className="registration-form__password-error-message" style={{ opacity: !passwordErrorMessage ? 0 : 1 }}>
            {passwordErrorMessage ? passwordErrorMessage : "_"}
         </span>

         <div className="registration-form__second-password-input-wrapper">Пароль ещё раз
            <input type="password"
               id="registration-form__password-input-second"
               required
               title="введите пароль ещё раз"
               ref={passwordInputSecond}
            />
            <span>Повторите пароль, пожалуйста, это обезопасит вас с нами
               на случай ошибки.</span>
         </div>
         <span className="registration-form__second-password-error-message" style={{ opacity: !passwordSecondErrorMessage ? 0 : 1 }}>
            {passwordSecondErrorMessage ? passwordSecondErrorMessage : "_"}
         </span>

         <hr className="registration-form__line" />

         <div className="registration-form__email-input-wrapper">Электронная почта
            <input type="email"
               id="registration-form__email-input"
               required
               title="введите email"
               name="email"
               onChange={formDataUpdate}
               ref={emailInput}
            />
            <span>Можно изменить адрес, указанный при регистрации.</span>
         </div>
         <span className="registration-form__email-error-message" style={{ opacity: !emailErrorMessage ? 0 : 1 }}>
            {emailErrorMessage ? emailErrorMessage : "_"}
         </span>

         <div className="registration-form__mailing-checkbox-wrapper">Я согласен
            <input type="checkbox"
               id="registration-form__mailing-checkbox"
               title="подписаться на рассылку информации"
               name="mailingApproval"
               checked={isMailingApproval}
               onChange={mailingApprovalHandler}
               ref={mailingApprovalCheckbox}
            />
            <span>принимать актуальную информацию на емейл</span>
         </div>

         <div className="registration-form__footer">
            <button type="submit">Изменить</button>
            {changeTime && <span>{`последние изменения ${changeTime}`}</span>}
         </div>
      </form >
   </div >
   //== JSX
}