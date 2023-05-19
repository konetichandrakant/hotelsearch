import React from 'react'

function Places(props) {
  const { closeAt,
    desc,
    entryFee,
    imageUrl,
    name,
    openAt,
    rating } = props;
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', background: 'white', margin: '0', padding: '0', border: '0' }}>
      <div style={{ margin: '5px' }}>
        <img src={imageUrl} style={{ width: '100px', height: '100px' }} />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div>
          <b>{name}</b>
        </div>
        <div>
          Rating:{rating}
        </div>
        <div>
          <p>{desc}</p>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', marginLeft: '10px', marginRight: '10px' }}>
        <span>
          Opens:
        </span>
        <span>
          {openAt}
        </span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', marginRight: '10px' }}>
        <span>
          Closes:
        </span>
        <span>
          {closeAt}
        </span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', marginRight: '10px' }}>
        <span>
          EntryFee:
        </span>
        <span>
          {entryFee}
        </span>
      </div>

    </div>
  )
}

export default Places