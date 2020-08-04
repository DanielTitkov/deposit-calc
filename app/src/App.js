import React, { useEffect } from 'react';
import Home from './pages/Home';
import { useDispatch } from 'react-redux';
import { getCurrentUser } from './store/actions/userActions';

const App = () => {

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getCurrentUser());
	}, [dispatch])

  return (
    <div className="App">
      <Home />
    </div>
  );
}

export default App;
