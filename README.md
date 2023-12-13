# Components Library

Compound Component Pattern을 적용하여 컴포넌트의 유연성과 재사용성에 주목해서 컴포넌트를 제작하였습니다.  
서브 컴포넌트에 관심사를 분리하여 Prop Drilling 문제를 해결하고 코드 복잡성을 낮추고 생산성은 향상 시킬 수 있도록 하였습니다.

## 주요 기능 및 API

### 주요기능

스케일 업,다운 하며 표시되는 시스템 모달 컴포넌트입니다.

실제 사용 예시는 아래와 같습니다.

```jsx
import { useState } from 'react';
import { SystemModal } from './components';

function App() {
  const [visible, setVisible] = useState(false);

  const onConfirm = () => {
    // 확인 버튼 클릭 시 실행 될 콜백함수
    setVisible(false);
  };

  const onCancel = () => {
    // 취소 버튼 클릭 시 실행 될 콜백함수
    setVisible(false);
  };

  return (
    <div id='app'>
      <button onClick={() => setVisible(true)}>버튼</button>
      <SystemModal visible={visible} onClose={() => setVisible(false)}>
        <SystemModal.Header title='제목영역' isCloseIcon />
        <SystemModal.Content>여기는 콘톤츠 영역입니다.</SystemModal.Content>
        <SystemModal.Footer confirmText='확인' cancelText='취소' onConfirm={onConfirm} onCancel={onCancel} />
      </SystemModal>
    </div>
  );
}
```

<br />

### API

**System.Header**
|Property|Description|Type|
|------|---|---|
|visible|모달창 표시 여부|boolean|
|onClose|모달창 닫을 때 실행되는 함수|() => void|

**System.Header**
|Property |Description|Type|
|------|---|---|
|title|제목 텍스트|string|
|isCloseIcon?|우측 상단 닫기 아이콘 표시 여부|boolean|

**System.Content**
|Property |Description|Type|
|------|---|---|
|children|콘텐츠|ReactNode|

**System.Footer**
|Property |Description|Type|
|------|---|---|
|type?|버튼 표시 유형|'all', 'confirm', 'cancel'|
|confirmText?|확인버튼 텍스트|string|
|cancelText?|취소버튼 텍스트|string|
|onConfirm?|확인버튼 클릭 시 실행될 함수|() => void|
|onCancel?|취소버튼 클릭 시 실행될 함수|() => void|
