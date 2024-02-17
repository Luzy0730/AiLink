import React, { forwardRef, memo, useCallback, useEffect, useImperativeHandle, useState } from 'react'
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import { Modal, Table, Button, Divider, Switch, App, Popconfirm } from 'antd';
import { UserOutlined } from '@ant-design/icons'
import { setToken, setUserInfo, setShowUserModal, setUserModalMode } from '@/store/modules/user.store'
import { getShortList, updateShort, deleteShort } from '@/apis/short'
import { InformationModalWrapper } from './style'
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';

const InformationModal = forwardRef((props, ref) => {
  const dispatch = useDispatch()
  const { userInfo } = useSelector(state => ({
    userInfo: state.user.userInfo,
  }), shallowEqual)
  const { message } = App.useApp()

  const [visible, setVisible] = useState(false)
  const handleCancel = () => {
    setVisible(false)
  }

  const logout = () => {
    dispatch(setToken(''))
    dispatch(setUserInfo(null))
    handleCancel()
  }

  const resetPwd = () => {
    dispatch(setUserModalMode(3))
    dispatch(setShowUserModal(true))
  }

  const handleCopy = (short) => {
    const sl = `${window.location.origin}/${short.short}`
    const pw = short.password ? `?pwd=${short.password}` : ''
    const textToCopy = `${sl}${pw}`
    if (navigator.clipboard) {
      navigator.clipboard.writeText(textToCopy)
        .then(() => {
          message.success('已复制到粘贴板');
        })
        .catch((error) => {
          message.error('复制功能出错');
        });
    } else {
      const textArea = document.createElement("textarea");
      textArea.value = textToCopy;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("Copy");
      textArea.remove();
      message.success('已复制到粘贴板');
    }
  }

  const handleSetEver = async (record, idx) => {
    try {
      setDataSource(pre => {
        const newData = [...pre]
        newData[idx].everLoading = true
        return newData
      })
      await updateShort({ id: record.id, isEver: record.isEver === 1 ? 0 : 1 })
      message.success(`已设为${record.isEver === 1 ? '限时' : '永久'}`);
      fetchShortList()
    } catch (error) { } finally {
      setDataSource(pre => {
        pre[idx].everLoading = false
        return [...pre]
      })
    }
  }

  const handleDelete = async (record, idx) => {
    try {
      setDataSource(pre => {
        const newData = [...pre]
        newData[idx].delLoading = true
        return newData
      })
      await deleteShort({ id: record.id })
      message.success('删除成功');
      fetchShortList()
    } catch (error) {
      message.error(error);
    } finally {
      setDataSource(pre => {
        pre[idx].delLoading = false
        return [...pre]
      })
    }


  }

  const handleSetStatus = async (record, idx) => {
    try {
      setDataSource(pre => {
        const newData = [...pre]
        newData[idx].statusLoading = true
        return newData
      })
      await updateShort({ id: record.id, status: record.status === 1 ? 0 : 1 })
      message.success(`已${record.status === 1 ? '禁用' : '启用'}`);
      fetchShortList()
    } catch (error) {
      message.error(error);
    } finally {
      setDataSource(pre => {
        pre[idx].statusLoading = false
        return [...pre]
      })
    }
  }

  const [dataSource, setDataSource] = useState([])
  const columns = [
    { title: '短链', dataIndex: 'short', key: 'short', width: 100 },
    {
      title: '原链接', dataIndex: 'url', key: 'url', ellipsis: true, render: (url) => {
        return (
          <Link target='_blank' to={url}>{url}</Link>
        )
      }
    },
    { title: '浏览数', dataIndex: 'visitCount', key: 'visitCount', width: 80 },
    {
      title: '密码', dataIndex: 'password', key: 'password', width: 80, render: (password) => {
        return (password || '无')
      }
    },
    {
      title: '启用', dataIndex: 'status', key: 'status', width: 80, render: (_, record, idx) => {
        return (
          <Switch size="small" loading={record.statusLoading} defaultChecked={record.status === 1} onClick={() => handleSetStatus(record, idx)} />
        )
      }
    },
    {
      title: '创建时间', dataIndex: 'create_time', key: 'create_time', width: 180, render: (create_time) => {
        return dayjs(create_time).format('YYYY-MM-DD HH:mm:ss')
      }
    },
    {
      title: '过期时间', dataIndex: 'expireTime', key: 'expireTime', width: 180, render: (_, { create_time, isEver }) => {
        if (isEver) return '永久有效'
        return dayjs(create_time).add(30, 'minute').format('YYYY-MM-DD HH:mm:ss')
      }
    },
    {
      title: '操作', dataIndex: 'ctrl', key: 'ctrl', width: 160, render: (_, record, idx) => {
        const warningEver = record.isEver === 1 && dayjs().isAfter(dayjs(record.create_time).add(30, 'minute'))
        return (
          <>
            <Button type="link" style={buttonStyles} onClick={() => handleCopy(record)}>分享</Button>
            {warningEver
              ?
              <Popconfirm
                title="温馨提醒"
                description="设置限时后短链将面临过期"
                okText="是"
                onConfirm={() => handleSetEver(record, idx)}
                cancelText="否"
              >
                <Button type="link" loading={record.everLoading} danger style={{ ...buttonStyles, margin: '0 6px' }}>限时</Button>
              </Popconfirm>
              : <Button type="link" loading={record.everLoading} danger={!!record.isEver} style={{ ...buttonStyles, margin: '0 6px' }} onClick={() => handleSetEver(record, idx)}>{record.isEver ? '限时' : '永久'}</Button>}
            <Popconfirm
              title="温馨提醒"
              description="确定删除此条短链?"
              onConfirm={() => handleDelete(record, idx)}
              okText="是"
              cancelText="否"
            >
              <Button type="link" loading={record.delLoading} danger style={buttonStyles}>删除</Button>
            </Popconfirm>
          </>
        )
      }
    },
  ];
  const [pagination, setPagination] = useState({
    page: 1, pageSize: 10
  })

  const handleChange = (page, pageSize) => {
    setPagination({ page, pageSize })
    setPaginationConfig(pre => ({ ...pre, current: page }))
  }

  const [paginationConfig, setPaginationConfig] = useState({
    current: pagination.page,
    onChange: handleChange,
    total: 0
  })

  const fetchShortList = useCallback(async () => {
    try {
      const { data } = await getShortList(pagination)
      setDataSource(data.data)
      setPaginationConfig(pre => ({ ...pre, total: data.total }))
    } catch (error) { }
  }, [pagination])

  const buttonStyles = {
    paddingInline: '0'
  };

  useEffect(() => {
    if (visible) { fetchShortList() }
  }, [visible, fetchShortList])

  useImperativeHandle(ref, () => ({ setVisible }))

  return (
    <Modal title='账号信息' preserve={false} destroyOnClose footer={false} open={visible} width={1200} onCancel={handleCancel}>
      <InformationModalWrapper>
        <div className='user-info'><UserOutlined />用户名：{userInfo?.username}</div>
        <div className='user-ctrl'>
          <Button type="primary" onClick={resetPwd}>更改密码</Button>
          <Button type="primary" onClick={logout}>退出登录</Button>
        </div>
        <Divider />
        <p className='short-title'>短链管理</p>
        <Table dataSource={dataSource} columns={columns} rowKey='id' pagination={paginationConfig} />;
        <ul>
          <li>短链浏览数10分钟更新一次。</li>
          <li>基于资源利用率考虑，仅可设置10条永久短链。</li>
        </ul>
      </InformationModalWrapper>
    </Modal>
  )
})

export default memo(InformationModal)