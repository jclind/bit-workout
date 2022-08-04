import React from 'react'
import { releaseNotes } from '../../../assets/data/releaseNotes'
import { AiOutlinePlusCircle } from 'react-icons/ai'
import { BiWrench } from 'react-icons/bi'
import { BsPencil } from 'react-icons/bs'
import './ReleaseNotes.scss'

const ReleaseNotes = () => {
  return (
    <div className='release-notes-page page'>
      <div className='settings-title'>Release Notes</div>
      <div className='releases'>
        {releaseNotes.map(data => {
          return (
            <div className='single-release' key={data.version}>
              <div className='heading-info'>
                <div className='version'>{data.version}</div>
                <div className='date'>{data.date}</div>
              </div>
              {data?.features?.length > 0 && (
                <div className='features bullet-point'>
                  <h5>
                    <AiOutlinePlusCircle className='icon' />
                    New Features
                  </h5>
                  <ul>
                    {data.features.map((feat, idx) => {
                      return (
                        <li className='feature' key={idx}>
                          {feat}
                        </li>
                      )
                    })}
                  </ul>
                </div>
              )}
              {data?.fixes?.length > 0 && (
                <div className='fixes bullet-point'>
                  <h5>
                    <BiWrench className='icon' />
                    Bug Fixes
                  </h5>
                  <ul>
                    {data.fixes.map((fix, idx) => {
                      return (
                        <li className='fix' key={idx}>
                          {fix}
                        </li>
                      )
                    })}
                  </ul>
                </div>
              )}
              {data?.improvements?.length > 0 && (
                <div className='improvements bullet-point'>
                  <h5>
                    <BsPencil className='icon' />
                    Other Changes / Improvements
                  </h5>
                  <ul>
                    {data.improvements.map((improvement, idx) => {
                      return (
                        <li className='improvement' key={idx}>
                          {improvement}
                        </li>
                      )
                    })}
                  </ul>
                </div>
              )}
            </div>
          )
        })}
      </div>
      <a
        href='https://github.com/jclind/bit-workout/releases'
        className='view-all-btn'
      >
        View All Release Notes
      </a>
    </div>
  )
}

export default ReleaseNotes
